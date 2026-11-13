import Link from "next/link";
import { whatsappGeneralUrl } from "@/lib/whatsapp";

export function SiteFooter() {
  const wa = whatsappGeneralUrl();

  return (
    <footer className="bg-[#00215b] text-white">
      <div className="site-shell grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="display text-[1.7rem] leading-tight text-white">
            Yeni Adatepe Nakliyat
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
            Karayolu taşımacılığı. Grup şirketimiz{" "}
            <strong className="font-bold text-white">Adatepe Global Lojistik</strong> ile
            aynı operasyon hattında çalışır.
          </p>
        </div>
        <div>
          <p className="display text-lg text-white">Sayfalar</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-white/80">
            <Link className="hover:text-[#f45905]" href="/#hakkimizda">
              Hakkımızda
            </Link>
            <Link className="hover:text-[#f45905]" href="/acik-sevkiyatlar">
              Açık Sevkiyatlar
            </Link>
            <Link className="hover:text-[#f45905]" href="/galeri">
              Galeri
            </Link>
            <Link className="hover:text-[#f45905]" href="/iletisim">
              İletişim
            </Link>
            <Link className="hover:text-[#f45905]" href="/admin">
              Yönetim
            </Link>
          </div>
        </div>
        <div>
          <p className="display text-lg text-white">Operasyon</p>
          <p className="mt-4 text-sm leading-relaxed text-white/75">
            Teklif, araç uygunluğu ve açık iş soruları WhatsApp hattından yürür.
          </p>
          <a
            href={wa}
            className="btn btn-primary btn-sm mt-5"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="site-shell flex flex-wrap items-center justify-between gap-3 py-4 text-xs text-white/60">
          <span>© {new Date().getFullYear()} Yeni Adatepe Nakliyat</span>
          <span>Adatepe Global Lojistik ile birlikte</span>
        </div>
      </div>
    </footer>
  );
}
