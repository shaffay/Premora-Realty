import { z } from 'zod';

export const propertyCategories = [
  'Apartment',
  'Villa',
  'Townhouse',
  'Penthouse',
  'Studio',
] as const;

export type PropertyCategory = (typeof propertyCategories)[number];

export const propertyBadges = [
  'Featured',
  'New',
  'Exclusive',
  'Investor Pick',
  'Signature',
] as const;

export type PropertyBadge = (typeof propertyBadges)[number];

export const PropertySchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  /** Community / neighbourhood name, e.g. "Downtown Dubai" */
  community: z.string(),
  communitySlug: z.string(),
  type: z.enum(propertyCategories),
  /** Display label which may differ from category, e.g. "Mansion" or "Loft" */
  typeLabel: z.string(),
  beds: z.number().int().min(0),
  baths: z.number().int().min(0),
  sqft: z.number().int().positive(),
  /** Price in AED */
  price: z.number().int().positive(),
  badge: z.enum(propertyBadges),
  featured: z.boolean(),
  /** ISO date used for "Newest" sort */
  listedAt: z.string(),
  description: z.string(),
  features: z.array(z.string()).length(6),
  agentId: z.string(),
  lat: z.number(),
  lng: z.number(),
  /** Hue seed (0-360) for the branded gradient placeholder */
  hue: z.number().min(0).max(360),
});

export type Property = z.infer<typeof PropertySchema>;

export const AgentSchema = z.object({
  id: z.string(),
  name: z.string(),
  initials: z.string(),
  role: z.string(),
  languages: z.array(z.string()),
  phone: z.string(),
  whatsapp: z.string(),
});

export type Agent = z.infer<typeof AgentSchema>;

export const CommunitySchema = z.object({
  slug: z.string(),
  name: z.string(),
  blurb: z.string(),
  count: z.number().int().nonnegative(),
  fromPrice: z.number().int().positive(),
  hue: z.number().min(0).max(360),
  lat: z.number(),
  lng: z.number(),
});

export type Community = z.infer<typeof CommunitySchema>;

export const TestimonialSchema = z.object({
  id: z.string(),
  quote: z.string(),
  name: z.string(),
  role: z.string(),
  initials: z.string(),
});

export type Testimonial = z.infer<typeof TestimonialSchema>;

export const ServiceSchema = z.object({
  slug: z.string(),
  icon: z.string(),
  title: z.string(),
  desc: z.string(),
});

export type Service = z.infer<typeof ServiceSchema>;
