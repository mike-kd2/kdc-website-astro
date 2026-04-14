/**
 * Analytics Event Tracking
 *
 * Provides type-safe event tracking for Plausible Analytics.
 * Only tracks events in production environment.
 */

// Type definitions for custom events
export type AnalyticsEvent =
  | 'discovery_call_click'
  | 'contact_form_submit'
  | 'contact_form_success'
  | 'contact_form_error'
  | 'floating_cta_click'
  | 'service_card_click'
  | 'email_click'
  | 'phone_click';

interface PlausibleEvent {
  (event: AnalyticsEvent, options?: { props?: Record<string, string | number | boolean> }): void;
}

/**
 * Track a custom event with Plausible Analytics
 *
 * @param event - The event name to track
 * @param props - Optional properties to attach to the event
 */
export const trackEvent: PlausibleEvent = (event, options) => {
  // Only track in production
  if (!import.meta.env.PROD) {
    console.log('[Analytics - Dev]', event, options?.props);
    return;
  }

  // Check if Plausible is loaded
  if (typeof window !== 'undefined' && (window as any).plausible) {
    try {
      (window as any).plausible(event, options);
    } catch (error) {
      console.error('[Analytics Error]', error);
    }
  }
};

/**
 * Track Discovery Call button clicks
 *
 * @param location - Where on the site the click occurred (e.g., 'hero', 'footer', 'floating_cta')
 */
export const trackDiscoveryCallClick = (location: string) => {
  trackEvent('discovery_call_click', {
    props: { location },
  });
};

/**
 * Track contact form submission
 */
export const trackContactFormSubmit = () => {
  trackEvent('contact_form_submit');
};

/**
 * Track contact form success
 */
export const trackContactFormSuccess = () => {
  trackEvent('contact_form_success');
};

/**
 * Track contact form error
 *
 * @param error - Error message or code
 */
export const trackContactFormError = (error: string) => {
  trackEvent('contact_form_error', {
    props: { error },
  });
};

/**
 * Track floating CTA button clicks
 */
export const trackFloatingCtaClick = () => {
  trackEvent('floating_cta_click');
};

/**
 * Track service card clicks
 *
 * @param service - The service name that was clicked
 */
export const trackServiceCardClick = (service: string) => {
  trackEvent('service_card_click', {
    props: { service },
  });
};

/**
 * Track email link clicks
 */
export const trackEmailClick = () => {
  trackEvent('email_click');
};

/**
 * Track phone link clicks
 */
export const trackPhoneClick = () => {
  trackEvent('phone_click');
};
