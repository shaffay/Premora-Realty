import type { LeadInput, NewsletterInput } from './lead-schema';

type ApiResponse = { success: boolean; error?: string };

async function postJson(url: string, body: unknown): Promise<ApiResponse> {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = (await res.json()) as ApiResponse;
    if (!res.ok) {
      return { success: false, error: data.error ?? 'Something went wrong.' };
    }
    return data;
  } catch {
    return { success: false, error: 'Network error. Please try again.' };
  }
}

export function submitLead(input: LeadInput): Promise<ApiResponse> {
  return postJson('/api/lead', input);
}

export function submitNewsletter(input: NewsletterInput): Promise<ApiResponse> {
  return postJson('/api/newsletter', input);
}
