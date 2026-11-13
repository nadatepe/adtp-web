import { BrandLogo } from "@/components/BrandLogo";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { whatsappGeneralUrl } from "@/lib/whatsapp";

const IMG = {
  hero: "/images/hero-1968.png",
  ownFleet: "/images/filo-agl.jpg",
  logoAgl: "/images/logo-agl.png",
};

const FOUNDERS = [
  { name: "Mustafa Adatepe", photo: "/images/kurucu-mustafa-adatepe.png" },
  { name: "Seyfullah Kocabıyık", photo: "/images/kurucu-seyfullah-kocabiyik.png" },
];

export default function HomePage() {
  const wa = whatsappGeneralUrl();

  return (
    <div>
      <section className="relative min-h-[100svh] bg-[#00215b] text-white">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMG.hero}
            alt="Şirketin ilk yıllarından, yüklü kamyonların önünde kurucu kadro"
            className="h-full w-full object-cover object-[60%_50%]"
          />
          <div className="hero-scrim absolute inset-0" />
        </div>
        <SiteHeader whatsappUrl={wa} />
        <div
          id="icerik"
          className="site-shell relative z-10 flex min-h-[100svh] flex-col justify-start pb-16 pt-28 sm:pt-32"
        >
          <div className="fade-up">
            <div className="w-full max-w-[690px] lg:-translate-x-[min(5cm,max(1cm,calc((100vw_-_1180px)/2_-_16px)))]">
              <h1>
                <BrandLogo />
              </h1>
              <p className="mx-auto mt-3 max-w-[600px] text-center text-[1.05rem] leading-relaxed text-white/95">
                Türkiye genelinde komple ve parsiyel karayolu taşımacılığı. Grup
                şirketimiz <strong>Adatepe Global Lojistik</strong> ile birlikte; doğru
                araç, belli hat, net teslim.
              </p>
              <div className="mt-5 flex items-center justify-center gap-3">
                <span className="rounded-md bg-white px-2 py-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={IMG.logoAgl}
                    alt="Adatepe Global Lojistik"
                    width={347}
                    height={145}
                    className="block h-9 w-auto sm:h-10"
                  />
                </span>
                <span className="display text-[1rem] font-medium text-white sm:text-[1.1rem]">
                  Yeni Adatepe kuruluşudur
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="hakkimizda" className="section">
        <div className="site-shell grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow">Hakkımızda</p>
            <h2 className="section-title">1968’den bugüne hizmetinizdeyiz</h2>
            <div className="mt-8 border-l-8 border-[#f45905] pl-6">
              <p className="display text-[4.6rem] leading-none text-[#00215b] sm:text-[5.5rem]">
                1968
              </p>
              <p className="display mt-2 text-[1.35rem] text-[#16213e]">Adapazarı</p>
            </div>
          </div>
          <div className="lg:col-span-7 lg:pt-10">
            <p className="text-[1.05rem] font-bold leading-relaxed text-[#16213e]">
              Şirketimiz 1968 yılında Adapazarı’nda, Mustafa Adatepe ve Seyfullah
              Kocabıyık ortaklığıyla kuruldu.
            </p>
            <ul className="mt-6 flex flex-wrap gap-6">
              {FOUNDERS.map((founder) => (
                <li key={founder.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={founder.photo}
                    alt={founder.name}
                    width={124}
                    height={160}
                    className="block h-[160px] w-[124px] border-b-4 border-[#f45905] object-cover shadow-[0_8px_20px_rgba(0,33,91,0.15)]"
                  />
                  <p className="display mt-3 whitespace-nowrap text-[1.02rem] leading-tight text-[#00215b]">
                    {founder.name}
                  </p>
                  <p className="mt-1 text-[0.82rem] text-[var(--steel)]">Kurucu ortak</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[var(--steel)] leading-relaxed">
              Yarım asrı aşkın süredir karayolu yük taşımacılığı yapıyoruz.
              Adapazarı’nda başlayan yolculuğumuz bugün Türkiye genelinde komple ve
              parsiyel sevkiyatlara uzanıyor. Kuruluştan bu yana iş anlayışımız
              değişmedi: verilen söz tutulur, yük zamanında ve eksiksiz teslim edilir.
            </p>
            <p className="mt-4 text-[var(--steel)] leading-relaxed">
              Bugün grup şirketimiz Adatepe Global Lojistik ile birlikte çalışıyoruz.
              Planlama grup operasyonunda, icra sahada. Muhatap tektir: yük nereden
              kalkacak, nereye inecek, hangi araçla gidecek.
            </p>
          </div>
        </div>
      </section>

      <section id="filomuz" className="bg-white pb-16 sm:pb-20">
        <div className="site-shell border-t border-[#e3e6ee] pt-14 text-center sm:pt-16">
          <p className="eyebrow">Bugün</p>
          <h2 className="section-title text-[#00215b]">Yoldaki filomuz</h2>
        </div>
        <figure className="mx-auto mt-8 max-w-[1418px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMG.ownFleet}
            alt="Adatepe Global Lojistik filosundan beş tır yan yana: kırmızı Iveco, sarı DAF, beyaz MAN, beyaz Mercedes ve kırmızı DAF"
            width={1418}
            height={386}
            className="block h-[220px] w-full object-cover object-[52%_50%] sm:h-auto"
          />
        </figure>
      </section>

      <SiteFooter />
    </div>
  );
}
