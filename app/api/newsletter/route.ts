import { NextResponse } from 'next/server';
import { newsletterSchema } from '@/lib/lead-schema';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const { ok } = rateLimit(`newsletter:${ip}`, 5, 60_000);
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

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Please enter a valid email.' },
      { status: 422 },
    );
  }

  if (parsed.data.company) {
    return NextResponse.json({ success: true });
  }

  console.info('[newsletter] new subscriber:', parsed.data.email);
  return NextResponse.json({ success: true });
}
