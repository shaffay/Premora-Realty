import type { LeadInput } from './lead-schema';

/**
 * Stubbed email dispatch. When ENABLE_EMAIL=true and RESEND_API_KEY is set,
 * this sends a notification via Resend; otherwise it logs server-side only.
 */
export async function sendLeadNotification(lead: LeadInput): Promise<void> {
  const enabled = process.env.ENABLE_EMAIL === 'true';
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL ?? 'hello@premora.ae';

  if (!enabled || !apiKey) {
    console.info('[lead] (email disabled) new lead received:', {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      interest: lead.interest,
      source: lead.source,
    });
    return;
  }

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Premora Realty <leads@premora.ae>',
        to,
        subject: `New lead: ${lead.name} (${lead.interest ?? 'enquiry'})`,
        text: [
          `Name: ${lead.name}`,
          `Email: ${lead.email}`,
          `Phone: ${lead.phone}`,
          `Interest: ${lead.interest ?? '—'}`,
          `Source: ${lead.source ?? '—'}`,
          '',
          lead.message ?? '',
        ].join('\n'),
      }),
    });
  } catch (err) {
    console.error('[lead] failed to send notification email', err);
  }
}
