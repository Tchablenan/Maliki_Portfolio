"use client";

import { useState, type FormEvent } from "react";

import { sendContactMessage } from "@/app/actions/contact";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

type Status = "idle" | "sending" | "success" | "error";

const field =
  "w-full border border-transparent bg-field px-4 py-3.5 text-base text-fg placeholder:text-muted transition-colors focus:border-accent focus:outline-none";
const label = "mb-2 block text-sm font-medium text-fg";

export function ContactForm({ t, lang }: { t: Dictionary["contact"]; lang: Locale }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const result = await sendContactMessage(new FormData(form));
      if (!result.ok) throw new Error("Message not sent");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <input type="hidden" name="lang" value={lang} />
      {/* Honeypot: hidden from people, tempting for bots */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] size-px opacity-0" />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            {t.name}
          </label>
          <input id="name" name="name" required autoComplete="name" placeholder={t.namePlaceholder} className={field} />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            {t.email}
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder={t.emailPlaceholder} className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className={label}>
          {t.subject}
        </label>
        <select id="subject" name="subject" defaultValue={t.subjects[0]} className={`${field} cursor-pointer`}>
          {t.subjects.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className={label}>
          {t.message}
        </label>
        <textarea id="message" name="message" required rows={5} placeholder={t.messagePlaceholder} className={`${field} resize-y`} />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-accent px-6 py-4 text-lg font-semibold text-white transition-colors duration-500 hover:bg-fg hover:text-bg disabled:cursor-wait disabled:opacity-70"
      >
        {status === "sending" ? t.sending : t.submit}
      </button>

      <p role="status" aria-live="polite" className={`text-sm font-medium ${status === "error" ? "text-red-500" : "text-emerald-600 dark:text-emerald-400"}`}>
        {status === "success" && t.success}
        {status === "error" && t.error}
      </p>
    </form>
  );
}
