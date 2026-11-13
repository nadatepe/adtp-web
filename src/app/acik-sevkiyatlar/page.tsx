import type { Metadata } from "next";
import Link from "next/link";
import { JobBoard } from "@/components/JobBoard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { listPublishedJobs } from "@/lib/jobs";
import { whatsappGeneralUrl, whatsappInquireUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Açık Sevkiyatlar",
  description:
    "Yeni Adatepe Nakliyat tarafından yayınlanan güncel açık sevkiyat ve taşıma işleri.",
};

export const dynamic = "force-dynamic";

export default async function AcikSevkiyatlarPage() {
  const jobs = await listPublishedJobs();
  const whatsappUrls = Object.fromEntries(
    jobs.map((job) => [job.id, whatsappInquireUrl(job)]),
  );

  return (
    <div>
      <div className="bg-[#00215b] pb-16 pt-32 text-white">
        <SiteHeader whatsappUrl={whatsappGeneralUrl()} />
        <div id="icerik" className="site-shell">
          <p className="eyebrow">Açık Sevkiyatlar</p>
          <h1 className="display mt-2 max-w-3xl text-4xl leading-tight text-white sm:text-5xl">
            Yayındaki taşıma işleri
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/80">
            Yükleme ve sevk yerlerine göre arayın. Uygun iş için WhatsApp ile “Bu iş
            hala açık mı?” diye sorun.
          </p>
        </div>
      </div>

      <section className="section pt-10">
        <div className="site-shell">
          <JobBoard jobs={jobs} whatsappUrls={whatsappUrls} />
          <p className="mt-10 text-sm text-[var(--steel)]">
            Kendi işinizi yönetmek için{" "}
            <Link href="/admin" className="underline decoration-[#f45905] underline-offset-4">
              yönetim paneline
            </Link>{" "}
            gidin.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
