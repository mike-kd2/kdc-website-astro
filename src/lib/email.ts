import type { ContactFormData } from './validations';

const MAILEROO_API_URL = 'https://smtp.maileroo.com/api/v2/emails';
const MAILEROO_API_KEY = import.meta.env.MAILEROO_API_KEY;
const CONTACT_EMAIL = import.meta.env.PUBLIC_CONTACT_EMAIL || 'michael@klauserdesigns.ch';

interface EmailObject {
  address: string;
  name?: string;
}

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

/**
 * Send email via Maileroo API
 */
async function sendEmail({ to, subject, html, replyTo }: EmailOptions): Promise<void> {
  if (!MAILEROO_API_KEY) {
    throw new Error('Maileroo API key is not configured');
  }

  const fromObj: EmailObject = {
    address: 'noreply@klauserdesigns.ch',
    name: 'KDC Website',
  };

  const toObj: EmailObject = {
    address: to,
  };

  const payload: Record<string, unknown> = {
    from: fromObj,
    to: toObj,
    subject,
    html,
  };

  if (replyTo) {
    payload.reply_to = { address: replyTo };
  }

  const response = await fetch(MAILEROO_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': MAILEROO_API_KEY,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to send email: ${error}`);
  }
}

/**
 * Send contact form submission email
 */
export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const html = `
    <!DOCTYPE html>
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
            ${
              data.phone
                ? `
            <div class="field">
              <div class="label">Telefon:</div>
              <div class="value"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></div>
            </div>
            `
                : ''
            }
            ${
              data.organization
                ? `
            <div class="field">
              <div class="label">Organisation / Firma:</div>
              <div class="value">${escapeHtml(data.organization)}</div>
            </div>
            `
                : ''
            }
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
    </html>
  `;

  await sendEmail({
    to: CONTACT_EMAIL,
    subject: `Kontaktanfrage von ${data.firstName} ${data.lastName}`,
    html,
    replyTo: data.email,
  });
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
