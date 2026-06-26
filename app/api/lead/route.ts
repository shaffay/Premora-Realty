import { NextResponse } from 'next/server';
import { leadSchema } from '@/lib/lead-schema';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { sendLeadNotification } from '@/lib/email';

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const { ok } = rateLimit(`lead:${ip}`, 5, 60_000);
  if (!ok) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please try again shortly.' },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body.' },
      { status: 400 },
    );
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: parsed.error.issues[0]?.message ?? 'Validation failed.',
      },
      { status: 422 },
    );
  }

  // Honeypot — silently accept bots without doing anything.
  if (parsed.data.company) {
    return NextResponse.json({ success: true });
  }

  await sendLeadNotification(parsed.data);

  return NextResponse.json({ success: true });
}
