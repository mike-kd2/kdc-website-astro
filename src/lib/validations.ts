import { z } from 'zod'

// German error messages for better UX
const errorMessages = {
  required: 'Dieses Feld ist erforderlich',
  invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
  invalidPhone: 'Bitte geben Sie eine gültige Telefonnummer ein',
  minLength: (min: number) => `Mindestens ${min} Zeichen erforderlich`,
  maxLength: (max: number) => `Maximal ${max} Zeichen erlaubt`,
}

// Contact Form Schema
export const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(1, errorMessages.required)
    .min(2, errorMessages.minLength(2))
    .max(50, errorMessages.maxLength(50)),
  lastName: z
    .string()
    .min(1, errorMessages.required)
    .min(2, errorMessages.minLength(2))
    .max(50, errorMessages.maxLength(50)),
  email: z.string().min(1, errorMessages.required).email(errorMessages.invalidEmail),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === '') return true
        // Swiss phone number formats: +41 XX XXX XX XX or 0XX XXX XX XX
        const phoneRegex = /^(\+41|0041|0)[1-9]\d{1,2}\s?\d{3}\s?\d{2}\s?\d{2}$/
        return phoneRegex.test(val.replace(/\s/g, ''))
      },
      {
        message: errorMessages.invalidPhone,
      }
    ),
  organization: z
    .string()
    .max(100, errorMessages.maxLength(100))
    .optional(),
  message: z
    .string()
    .min(1, errorMessages.required)
    .min(10, errorMessages.minLength(10))
    .max(2000, errorMessages.maxLength(2000)),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
