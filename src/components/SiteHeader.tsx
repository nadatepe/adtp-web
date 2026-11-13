"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/#hakkimizda", label: "Hakkımızda" },
  { href: "/galeri", label: "Galeri" },
  { href: "/iletisim", label: "İletişim" },
];

export function SiteHeader({ whatsappUrl }: { whatsappUrl: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        stuck || open ? "bg-[#00215b]" : "bg-transparent"
      }`}
    >
      <a
        href="#icerik"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-white focus:px-3 focus:py-2 focus:text-[#00215b]"
      >
        İçeriğe geç
      </a>
      <div className="site-shell flex items-center justify-between gap-6 py-5">
        <Link
          href="/"
          className={`display text-[1.05rem] font-medium tracking-wide transition-colors sm:text-lg lg:-translate-x-[min(2cm,max(0px,calc((100vw_-_1180px)/2_-_16px)))] ${
            pathname === "/" ? "text-[#f45905]" : "text-white hover:text-[#f45905]"
          }`}
        >
          Anasayfa
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Ana menü">
          {links.map((link) => {
            const active = !link.href.includes("#") && pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`display text-[15px] font-medium tracking-wide transition-colors ${
                  active ? "text-[#f45905]" : "text-white hover:text-[#f45905]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="/acik-sevkiyatlar" className="btn btn-primary btn-sm">
            Açık Sevkiyatlar
          </Link>
          <a href={whatsappUrl} className="btn btn-wa btn-sm" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <a href={whatsappUrl} className="btn btn-wa btn-sm" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <button
            type="button"
            className="btn btn-ghost btn-sm only-mobile"
            aria-expanded={open}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Kapat" : "Menü"}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[#00215b] lg:hidden">
          <nav className="site-shell flex flex-col gap-1 py-4" aria-label="Mobil menü">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="display py-2 text-lg text-white hover:text-[#f45905]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/acik-sevkiyatlar" className="btn btn-primary btn-sm mt-3 self-start">
              Açık Sevkiyatlar
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
