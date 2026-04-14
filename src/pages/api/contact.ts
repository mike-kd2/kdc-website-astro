export const prerender = false

import type { APIContext } from 'astro'
import { contactFormSchema } from '../../lib/validations'
import { sendContactEmail } from '../../lib/email'

export async function POST({ request }: APIContext) {
  try {
    const body = await request.json()
    const result = contactFormSchema.safeParse(body)
    if (!result.success) {
      return new Response(JSON.stringify({
        error: 'Validierungsfehler',
        details: result.error.flatten().fieldErrors
      }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }
    await sendContactEmail(result.data)
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Interner Fehler' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
