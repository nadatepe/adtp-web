import type { Metadata } from "next";
import { Kanit, Lato } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-kanit",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Yeni Adatepe Nakliyat | Karayolu Taşımacılığı",
    template: "%s | Yeni Adatepe Nakliyat",
  },
  description:
    "Yeni Adatepe Nakliyat, Adatepe Global Lojistik ile birlikte Türkiye genelinde karayolu taşımacılığı yapar. Açık sevkiyatlar ve WhatsApp hattı.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${kanit.variable} ${lato.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
