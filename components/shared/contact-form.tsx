'use client';

import { useState } from "react";

import type { ContactInquiryInput } from "@/lib/validations/contact";
import { contactInquirySchema } from "@/lib/validations/contact";

type FormStatus =
  | {
      type: "idle";
      message: "";
    }
  | {
      type: "error" | "success";
      message: string;
    };

const initialValues: ContactInquiryInput = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export function ContactForm() {
  const [values, setValues] = useState<ContactInquiryInput>(initialValues);
  const [status, setStatus] = useState<FormStatus>({
    type: "idle",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof ContactInquiryInput>(
    field: K,
    value: ContactInquiryInput[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = contactInquirySchema.safeParse(values);

    if (!parsed.success) {
      const firstError =
        Object.values(parsed.error.flatten().fieldErrors).flat()[0] ??
        "Please review the form fields.";

      setStatus({
        type: "error",
        message: firstError,
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });

      const result = (await response.json()) as {
        ok: boolean;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.message ?? "Unable to send your message.");
      }

      setValues(initialValues);
      setStatus({
        type: "success",
        message:
          result.message ??
          "Your message has been received. We will get back to you soon.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "Unable to send your message right now. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">
            Name
          </span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="w-full rounded-[1.1rem] border border-[var(--color-line)] bg-white px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-primary)]"
            maxLength={80}
            required
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">
            Phone
          </span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className="w-full rounded-[1.1rem] border border-[var(--color-line)] bg-white px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-primary)]"
            maxLength={30}
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">
          Email
        </span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
          className="w-full rounded-[1.1rem] border border-[var(--color-line)] bg-white px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-primary)]"
          maxLength={120}
          required
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">
          Message
        </span>
        <textarea
          name="message"
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          className="min-h-32 w-full resize-y rounded-[1.1rem] border border-[var(--color-line)] bg-white px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-primary)]"
          maxLength={1000}
          required
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-primary-container)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Sending..." : "Send secure inquiry"}
      </button>

      <p
        aria-live="polite"
        className={`text-sm leading-6 ${
          status.type === "error"
            ? "text-[var(--color-error)]"
            : "text-[var(--color-muted)]"
        }`}
      >
        {status.message}
      </p>
    </form>
  );
}
