import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Send } from 'lucide-react';
import { contactFormSchema, type ContactFormData } from '../../lib/validations';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';
import {
  trackContactFormSubmit,
  trackContactFormSuccess,
  trackContactFormError,
} from '../../lib/analytics';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export interface ContactFormProps {
  onSuccess?: () => void;
  className?: string;
}

export function ContactForm({ onSuccess, className = '' }: ContactFormProps) {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('loading');
    setErrorMessage('');
    trackContactFormSubmit();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Ein Fehler ist aufgetreten');
      }

      setSubmitStatus('success');
      trackContactFormSuccess();
      reset();
      onSuccess?.();
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : 'Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.';
      setSubmitStatus('error');
      setErrorMessage(errorMsg);
      trackContactFormError(errorMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${className}`} aria-label="Kontaktformular">
      {/* Name Fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Input
            {...register('firstName')}
            label="Vorname"
            placeholder="Ihr Vorname"
            error={errors.firstName?.message}
            disabled={submitStatus === 'loading'}
            required
          />
        </div>
        <div>
          <Input
            {...register('lastName')}
            label="Nachname"
            placeholder="Ihr Nachname"
            error={errors.lastName?.message}
            disabled={submitStatus === 'loading'}
            required
          />
        </div>
      </div>

      {/* Email Field */}
      <div>
        <Input
          {...register('email')}
          type="email"
          label="E-Mail"
          placeholder="ihre@email.ch"
          error={errors.email?.message}
          disabled={submitStatus === 'loading'}
          required
        />
      </div>

      {/* Phone Field (Optional) */}
      <div>
        <Input
          {...register('phone')}
          type="tel"
          label="Telefon (optional)"
          placeholder="+41 79 123 45 67"
          error={errors.phone?.message}
          disabled={submitStatus === 'loading'}
        />
      </div>

      {/* Organization Field (Optional) */}
      <div>
        <Input
          {...register('organization')}
          label="Organisation / Firma (optional)"
          placeholder="Ihre Firma oder Organisation"
          error={errors.organization?.message}
          disabled={submitStatus === 'loading'}
        />
      </div>

      {/* Message Field */}
      <div>
        <TextArea
          {...register('message')}
          label="Wie kann ich Ihnen helfen?"
          placeholder="Beschreiben Sie Ihr Anliegen..."
          rows={6}
          error={errors.message?.message}
          disabled={submitStatus === 'loading'}
          required
        />
      </div>

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-800 border border-red-200" role="alert" aria-live="assertive">
          <p className="font-medium">Fehler beim Senden</p>
          <p className="mt-1">{errorMessage}</p>
        </div>
      )}

      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="rounded-md bg-green-50 p-4 text-sm text-green-800 border border-green-200" role="status" aria-live="polite">
          <p className="font-medium">Nachricht erfolgreich gesendet!</p>
          <p className="mt-1">Ich melde mich innerhalb von 24 Stunden bei Ihnen.</p>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={submitStatus === 'loading'}
          className="w-full sm:w-auto"
        >
          {submitStatus === 'loading' ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Wird gesendet...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Nachricht senden
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

export default ContactForm;
