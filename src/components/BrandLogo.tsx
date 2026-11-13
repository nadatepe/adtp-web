export function BrandLogo() {
  return (
    <span className="relative block w-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo-yeni-adatepe-dolu.png"
        alt="Yeni Adatepe Nakliyat, 1968"
        width={631}
        height={220}
        className="hero-logo block h-auto w-full"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo-yeni-adatepe-nakliyat.png"
        alt=""
        aria-hidden="true"
        width={631}
        height={220}
        className="hero-logo-text absolute inset-0 h-full w-full"
      />
    </span>
  );
}
