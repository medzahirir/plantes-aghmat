import { z } from "zod";

export const contactInquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(120),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[+()\-.\s\d]*$/, "Please enter a valid phone number.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please add a short message.")
    .max(1000, "Message is too long."),
});

export type ContactInquiryInput = z.infer<typeof contactInquirySchema>;
