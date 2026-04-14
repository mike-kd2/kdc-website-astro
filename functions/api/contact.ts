interface Env {
  MAILEROO_API_KEY: string
  PUBLIC_CONTACT_EMAIL?: string
}

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  organization?: string
  message: string
}

type ValidationErrors = Record<string, string[]>

function validateForm(body: unknown): { success: true; data: ContactFormData } | { success: false; errors: ValidationErrors } {
  if (!body || typeof body !== 'object') {
    return { success: false, errors: { _: ['Ungültige Anfrage'] } }
  }
  const d = body as Record<string, unknown>
  const errors: ValidationErrors = {}

  const firstName = typeof d.firstName === 'string' ? d.firstName.trim() : ''
  const lastName = typeof d.lastName === 'string' ? d.lastName.trim() : ''
  const email = typeof d.email === 'string' ? d.email.trim() : ''
  const phone = typeof d.phone === 'string' ? d.phone.trim() : undefined
  const organization = typeof d.organization === 'string' ? d.organization.trim() : undefined
  const message = typeof d.message === 'string' ? d.message.trim() : ''

  if (!firstName || firstName.length < 2) errors.firstName = ['Mindestens 2 Zeichen erforderlich']
  else if (firstName.length > 50) errors.firstName = ['Maximal 50 Zeichen erlaubt']

  if (!lastName || lastName.length < 2) errors.lastName = ['Mindestens 2 Zeichen erforderlich']
  else if (lastName.length > 50) errors.lastName = ['Maximal 50 Zeichen erlaubt']

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = ['Bitte geben Sie eine gültige E-Mail-Adresse ein']

  if (phone) {
    const phoneRegex = /^(\+41|0041|0)[1-9]\d{1,2}\s?\d{3}\s?\d{2}\s?\d{2}$/
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) errors.phone = ['Bitte geben Sie eine gültige Telefonnummer ein']
  }

  if (organization && organization.length > 100) errors.organization = ['Maximal 100 Zeichen erlaubt']

  if (!message || message.length < 10) errors.message = ['Mindestens 10 Zeichen erforderlich']
  else if (message.length > 2000) errors.message = ['Maximal 2000 Zeichen erlaubt']

  if (Object.keys(errors).length > 0) return { success: false, errors }

  return { success: true, data: { firstName, lastName, email, phone, organization, message } }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

function buildEmailHtml(data: ContactFormData): string {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: 'Inter', 'Segoe UI', sans-serif; line-height: 1.6; color: #1F2937; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: linear-gradient(135deg, #0A4D4E 0%, #1A7A7A 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
      .content { background: #F8FAFC; padding: 30px; border-radius: 0 0 8px 8px; }
      .field { margin-bottom: 20px; }
      .label { font-weight: 600; color: #475569; margin-bottom: 5px; }
      .value { background: white; padding: 12px; border-radius: 4px; border: 1px solid #E2E8F0; }
      .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #E2E8F0; font-size: 14px; color: #64748B; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1 style="margin: 0; font-size: 24px;">Neue Kontaktanfrage</h1>
        <p style="margin: 10px 0 0; opacity: 0.9;">Von der KDC Website</p>
      </div>
      <div class="content">
        <div class="field">
          <div class="label">Name:</div>
          <div class="value">${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</div>
        </div>
        <div class="field">
          <div class="label">E-Mail:</div>
          <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
        </div>
        ${data.phone ? `
        <div class="field">
          <div class="label">Telefon:</div>
          <div class="value"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></div>
        </div>` : ''}
        ${data.organization ? `
        <div class="field">
          <div class="label">Organisation / Firma:</div>
          <div class="value">${escapeHtml(data.organization)}</div>
        </div>` : ''}
        <div class="field">
          <div class="label">Nachricht:</div>
          <div class="value" style="white-space: pre-wrap;">${escapeHtml(data.message)}</div>
        </div>
        <div class="footer">
          <p>Diese Nachricht wurde über das Kontaktformular auf klauserdesigns.ch gesendet.</p>
          <p>Antworten Sie direkt an ${escapeHtml(data.email)}</p>
        </div>
      </div>
    </div>
  </body>
</html>`
}

async function sendEmail(data: ContactFormData, env: Env): Promise<void> {
  const to = env.PUBLIC_CONTACT_EMAIL || 'michael@klauserdesigns.ch'

  const response = await fetch('https://smtp.maileroo.com/api/v2/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': env.MAILEROO_API_KEY,
    },
    body: JSON.stringify({
      from: { address: 'noreply@klauserdesigns.ch', name: 'KDC Website' },
      to: { address: to },
      reply_to: { address: data.email },
      subject: `Kontaktanfrage von ${data.firstName} ${data.lastName}`,
      html: buildEmailHtml(data),
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Maileroo error: ${error}`)
  }
}

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }): Promise<Response> => {
  const json = () => (body: unknown, status: number) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json' },
    })
  const respond = json()

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return respond({ error: 'Ungültige JSON-Anfrage' }, 400)
  }

  const result = validateForm(body)
  if (!result.success) {
    return respond({ error: 'Validierungsfehler', details: result.errors }, 400)
  }

  if (!env.MAILEROO_API_KEY) {
    return respond({ error: 'E-Mail-Service nicht konfiguriert' }, 500)
  }

  try {
    await sendEmail(result.data, env)
    return respond({ success: true }, 200)
  } catch (e) {
    console.error('Email sending failed:', e)
    return respond({ error: 'Interner Fehler beim E-Mail-Versand' }, 500)
  }
}
