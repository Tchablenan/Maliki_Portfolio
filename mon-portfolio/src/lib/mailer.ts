import "server-only";

import nodemailer from "nodemailer";

/**
 * Outgoing e-mail through the owner's Gmail account (SMTP + Google "app password").
 * Both values are secrets set in Vercel only — never in the repository.
 */
const user = process.env.GMAIL_USER ?? "";
const pass = (process.env.GMAIL_APP_PASSWORD ?? "").replace(/\s+/g, "");

export const isMailerConfigured = Boolean(user && pass);
export const mailerAddress = user;

export async function sendMail({ to, subject, text, fromName }: { to: string; subject: string; text: string; fromName: string }) {
  if (!isMailerConfigured) throw new Error("L'envoi d'e-mails n'est pas encore configuré.");
  const transport = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user, pass } });
  await transport.sendMail({ from: { name: fromName, address: user }, to, subject, text, replyTo: user });
}
