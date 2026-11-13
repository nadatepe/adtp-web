import { readdir } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import { BrandLogo } from "@/components/BrandLogo";
import { Gallery, type GalleryImage } from "@/components/Gallery";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { whatsappGeneralUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Galeri",
  description: "Yeni Adatepe Nakliyat ve Adatepe Global Lojistik fotoğraf galerisi.",
};

export const dynamic = "force-dynamic";

const GALLERY_DIR = path.join(process.cwd(), "public", "images", "galeri");

async function loadImages(): Promise<GalleryImage[]> {
  const files = await readdir(GALLERY_DIR).catch(() => []);
  return files
    .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, "tr", { numeric: true }))
    .map((f) => ({
      src: `/images/galeri/${encodeURIComponent(f)}`,
      caption: path
        .parse(f)
        .name.replace(/^\d+[-_.\s]*/, "")
        .replace(/[-_]+/g, " ")
        .trim(),
    }));
}

export default async function GaleriPage() {
  const images = await loadImages();

  return (
    <div>
      <div className="bg-[#00215b] pb-16 pt-32 text-white">
        <SiteHeader whatsappUrl={whatsappGeneralUrl()} />
        <div id="icerik" className="site-shell flex items-center justify-between gap-10">
          <div>
            <p className="eyebrow">Galeri</p>
            <h1 className="display mt-2 max-w-3xl text-4xl leading-tight text-white sm:text-5xl">
              1968’den bugüne fotoğraflarla
            </h1>
          </div>
          <div className="hidden w-full max-w-[300px] shrink-0 md:block lg:max-w-[340px]">
            <BrandLogo />
          </div>
        </div>
      </div>

      <section className="section pt-10">
        <div className="site-shell">
          <Gallery images={images} />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
