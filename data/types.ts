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
  /** Hue seed (0-360) for the branded gradient placeholder shown while the image loads */
  hue: z.number().min(0).max(360),
  /** Path to the hero photo for this listing (under /public). */
  image: z.string(),
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
  avatar: z.string(),
});

export type Agent = z.infer<typeof AgentSchema>;

/**
 * Controlled vocabulary for community cards — keeps the tag set small enough
 * to stay meaningful and prevents one-off labels drifting in over time.
 */
export const communityTags = [
  'Best for Investment',
  'Best for Families',
  'Waterfront Living',
  'Luxury Villas',
  'Luxury Living',
  'Entry-Level Buyers',
  'High Rental Demand',
  'Urban Lifestyle',
  'Central Location',
] as const;

export type CommunityTag = (typeof communityTags)[number];

export const CommunitySchema = z.object({
  slug: z.string(),
  name: z.string(),
  blurb: z.string(),
  count: z.number().int().nonnegative(),
  fromPrice: z.number().int().positive(),
  hue: z.number().min(0).max(360),
  lat: z.number(),
  lng: z.number(),
  /** Path to the community photo (under /public). */
  image: z.string(),
  /** Why this community matters — at most two, drawn from `communityTags`. */
  tags: z.array(z.enum(communityTags)).max(2),
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
