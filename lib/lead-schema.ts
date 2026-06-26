import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().min(2, 'Please enter your name').max(80),
  phone: z
    .string()
    .min(6, 'Please enter a valid phone number')
    .max(24)
    .regex(/^[+\d\s()-]+$/, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email'),
  message: z.string().max(1000).optional().or(z.literal('')),
  interest: z.string().max(80).optional().or(z.literal('')),
  /** Context: which property / page the lead came from */
  source: z.string().max(160).optional().or(z.literal('')),
  /** Honeypot — must stay empty */
  company: z.string().max(0).optional().or(z.literal('')),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  company: z.string().max(0).optional().or(z.literal('')),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
