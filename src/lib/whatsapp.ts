import type { Job } from "./jobs";
import { jobSummary } from "./jobs";

/** Digits only international number, e.g. 905326756699 */
export function whatsappNumber(): string {
  const raw = process.env.WHATSAPP_NUMBER?.trim() || "905326756699";
  return raw.replace(/[^\d]/g, "") || "905326756699";
}

export function whatsappInquireUrl(job: Job): string {
  const message = [
    "Merhaba, Yeni Adatepe Nakliyat açık sevkiyatı hakkında yazıyorum.",
    "Bu iş hala açık mı?",
    jobSummary(job),
  ].join("\n");
  return `https://wa.me/${whatsappNumber()}?text=${encodeURIComponent(message)}`;
}

export function whatsappGeneralUrl(text?: string): string {
  const message =
    text ??
    "Merhaba, Yeni Adatepe Nakliyat lojistik hizmetleri hakkında bilgi almak istiyorum.";
  return `https://wa.me/${whatsappNumber()}?text=${encodeURIComponent(message)}`;
}
