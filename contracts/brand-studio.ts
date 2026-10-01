import { z } from 'zod';
export const studioPackages = [
  { name: 'Brand Essentials', price: '$495', audience: 'Give your idea a recognizable identity.', features: ['Brand direction and a primary logo concept', 'Color palette and typography guide', 'Three branded promotional graphics', 'Two consolidated revision rounds'], note: 'Brand design package; website sold separately.' },
  { name: 'Author Launch', price: '$2,495', audience: 'Put your book, story, and reader community in one place.', features: ['Up to five responsive website pages', 'Author bio, book presentation and purchase links', 'Brand direction and introductory website copy', 'Email signup and a simple press introduction', 'Two consolidated revision rounds'], note: 'Manuscript editing, publishing fees and book distribution are quoted separately.' },
  { name: 'Business Identity', price: '$2,495', audience: 'Help customers find you and take the next step.', features: ['Up to five responsive website pages', 'Brand direction and introductory website copy', 'One booking or payment-provider integration', 'Contact form and owner handoff', 'Two consolidated revision rounds'], note: 'Custom dashboards, complex scheduling and advanced applications require a separate scope.' },
] as const;
export const studioInquirySchema = z.object({
  name: z.string().trim().min(2).max(255),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(50).optional(),
  business: z.string().trim().min(2).max(200),
  package: z.enum(['Brand Essentials', 'Author Launch', 'Business Identity', 'Writing & Copy', 'Monthly Care', 'Custom Project']),
  budget: z.enum(['Under $500', '$500–$1,499', '$1,500–$2,999', '$3,000+', 'Need guidance']),
  timeline: z.enum(['Within a month', '1–3 months', 'Exploring options']),
  website: z.string().trim().max(500).refine(v => !v || /^https?:\/\//i.test(v) && URL.canParse(v), 'Enter a complete http or https URL.').optional(),
  message: z.string().trim().min(20).max(1500),
  consent: z.literal(true),
  companyWebsite: z.string().max(500).default(''),
});
export type StudioInquiry = z.infer<typeof studioInquirySchema>;
export function studioLeadValues(input: StudioInquiry) {
  return { name: input.name, email: input.email.toLowerCase(), phone: input.phone || null,
    interest: `Brand Studio · ${input.package}`, sourcePage: '/brand-studio',
    message: `Business / author: ${input.business}\nBudget: ${input.budget}\nTimeline: ${input.timeline}\nExisting website: ${input.website || 'None provided'}\n\n${input.message}` };
}
