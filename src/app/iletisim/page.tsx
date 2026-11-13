import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { whatsappGeneralUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Yeni Adatepe Nakliyat telefon, adres, e-posta ve web iletişim bilgileri.",
};

const PHONE_GROUPS = [
  { label: "Telefon", numbers: ["902642417004", "902642419142"] },
  { label: "Cep", numbers: ["905326756699", "905321007364"] },
];

const EMAIL = "bilgi@yeniadatepe.com";
const WEB = "www.yeniadatepe.com";
const ADDRESS_LINES = [
  "Şehit Zekeriya Gözyuman Cad.,",
  "Hanlı Tır Kamyon Parkı A Blok No: 8,",
  "Arifiye / Sakarya",
];
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Şehit Zekeriya Gözyuman Cad. Hanlı Tır Kamyon Parkı A Blok No: 8, Arifiye, Sakarya",
)}`;

function formatPhone(digits: string): string {
  const m = digits.match(/^90(\d{3})(\d{3})(\d{2})(\d{2})$/);
  return m ? `0${m[1]} ${m[2]} ${m[3]} ${m[4]}` : `+${digits}`;
}

const valueClass =
  "display text-[1.25rem] leading-snug text-white hover:text-[#f45905] sm:text-[1.6rem]";

export default function IletisimPage() {
  return (
    <section className="relative min-h-[100svh] bg-[#00215b] text-white">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-1968.png"
          alt="Şirketin ilk yıllarından, yüklü kamyonların önünde kurucu kadro"
          className="h-full w-full object-cover object-[60%_50%]"
        />
        <div className="hero-scrim absolute inset-0" />
      </div>
      <SiteHeader whatsappUrl={whatsappGeneralUrl()} />
      <div
        id="icerik"
        className="site-shell relative z-10 flex min-h-[100svh] flex-col justify-center pb-12 pt-28"
      >
        <div className="fade-up max-w-[880px]">
          <h1 className="display text-[2.8rem] font-semibold leading-[1.02] text-white sm:text-[4rem] lg:text-[4.5rem]">
            İletişim
          </h1>
          <dl className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-8">
            {PHONE_GROUPS.map((group) => (
              <div key={group.label}>
                <dt className="eyebrow">{group.label}</dt>
                {group.numbers.map((number) => (
                  <dd key={number} className="mt-2">
                    <a href={`tel:+${number}`} className={valueClass}>
                      {formatPhone(number)}
                    </a>
                  </dd>
                ))}
              </div>
            ))}
            <div>
              <dt className="eyebrow">E-posta</dt>
              <dd className="mt-2">
                <a href={`mailto:${EMAIL}`} className={valueClass}>
                  {EMAIL}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Web</dt>
              <dd className="mt-2">
                <a
                  href={`https://${WEB}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={valueClass}
                >
                  {WEB}
                </a>
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="eyebrow">Adres</dt>
              <dd className="mt-2">
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={valueClass}
                >
                  {ADDRESS_LINES.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
