import { z } from "zod";

const siteConfigSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://www.aghmatplants.ma"),
  NEXT_PUBLIC_BUSINESS_NAME: z.string().min(1).default("Aghmat Plants"),
  NEXT_PUBLIC_BUSINESS_PHONE: z.string().min(1).default("+212 611 22 33 44"),
  NEXT_PUBLIC_BUSINESS_EMAIL: z
    .string()
    .email()
    .default("hello@aghmatplants.ma"),
  NEXT_PUBLIC_WHATSAPP_NUMBER: z
    .string()
    .regex(/^\d+$/)
    .default("212611223344"),
  NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL: z
    .string()
    .url()
    .default("https://www.google.com/maps?q=Aghmat%2C%20Morocco&z=12&output=embed"),
  CONTACT_RECIPIENT_EMAIL: z
    .string()
    .email()
    .default("hello@aghmatplants.ma"),
});

const parsedSiteConfig = siteConfigSchema.parse(process.env);

export const siteConfig = {
  siteUrl: parsedSiteConfig.NEXT_PUBLIC_SITE_URL,
  businessName: parsedSiteConfig.NEXT_PUBLIC_BUSINESS_NAME,
  businessPhone: parsedSiteConfig.NEXT_PUBLIC_BUSINESS_PHONE,
  businessEmail: parsedSiteConfig.NEXT_PUBLIC_BUSINESS_EMAIL,
  whatsappNumber: parsedSiteConfig.NEXT_PUBLIC_WHATSAPP_NUMBER,
  mapsEmbedUrl: parsedSiteConfig.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL,
  contactRecipientEmail: parsedSiteConfig.CONTACT_RECIPIENT_EMAIL,
  get businessPhoneHref() {
    return `tel:${this.businessPhone.replace(/[^\d+]/g, "")}`;
  },
  get businessEmailHref() {
    return `mailto:${this.businessEmail}`;
  },
  get whatsappHref() {
    return `https://wa.me/${this.whatsappNumber}`;
  },
  get whatsappCatalogHref() {
    return `${this.whatsappHref}?text=Hello%20${encodeURIComponent(this.businessName)}%2C%20I%27m%20interested%20in%20your%20plant%20collection.`;
  },
  get whatsappContactHref() {
    return `${this.whatsappHref}?text=Hello%20${encodeURIComponent(this.businessName)}%2C%20I%27d%20like%20help%20with%20a%20plant%20order.`;
  },
};
