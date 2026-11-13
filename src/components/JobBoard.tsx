"use client";

import { useMemo, useState } from "react";
import type { Job } from "@/lib/jobs";

type Props = {
  jobs: Job[];
  whatsappUrls: Record<string, string>;
};

export function JobBoard({ jobs, whatsappUrls }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const tokens = query
      .toLocaleLowerCase("tr")
      .split(/[^\p{L}\p{N}]+/u)
      .filter(Boolean);
    if (tokens.length === 0) return jobs;
    return jobs.filter((job) => {
      const hay = [job.yukleme_yeri, job.sevk_yeri, job.arac_tipi, job.yuk_nevi, job.navlun, job.aciklama]
        .join(" ")
        .toLocaleLowerCase("tr");
      return tokens.every((token) => hay.includes(token));
    });
  }, [jobs, query]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 border-b border-[#00215b]/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="field max-w-md flex-1">
          <label htmlFor="job-search">Sevkiyat ara</label>
          <input
            id="job-search"
            className="search-input"
            placeholder="Yükleme, sevk yeri, araç tipi…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <p className="display text-sm tracking-wide text-[var(--steel)]">
          {filtered.length} açık sevkiyat
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="border border-dashed border-[#00215b]/25 px-6 py-14 text-center">
          <p className="display text-2xl text-[var(--navy)]">Şu an eşleşen iş yok</p>
          <p className="mt-2 text-[var(--steel)]">Filtreyi temizleyin veya daha sonra tekrar bakın.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {filtered.map((job) => (
            <li key={job.id} className="border border-[#d5d9e6] bg-white">
              <div className="flex flex-col gap-5 p-5 lg:flex-row lg:items-start lg:justify-between lg:p-6">
                <div className="min-w-0 flex-1">
                  <p className="display flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[1.55rem] leading-tight text-[var(--navy)]">
                    <span>{job.yukleme_yeri}</span>
                    <span className="text-[#f45905]" aria-hidden>
                      →
                    </span>
                    <span>{job.sevk_yeri}</span>
                  </p>
                  <dl className="mt-4 grid gap-4 sm:grid-cols-3">
                    <Meta label="Araç tipi" value={job.arac_tipi} />
                    <Meta label="Yük nevi" value={job.yuk_nevi} />
                    <Meta label="Navlun" value={job.navlun} accent />
                  </dl>
                  {job.aciklama ? (
                    <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--steel)]">
                      <span className="display mr-2 text-[0.72rem] tracking-[0.12em] text-[var(--navy)] uppercase">
                        Açıklama
                      </span>
                      {job.aciklama}
                    </p>
                  ) : null}
                </div>
                <div className="flex shrink-0 flex-row gap-2 lg:flex-col">
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                      const phrase = `${job.yukleme_yeri} → ${job.sevk_yeri} ${job.arac_tipi}`.trim();
                      setQuery(phrase);
                      document.getElementById("job-search")?.focus();
                    }}
                  >
                    Ara
                  </button>
                  <a
                    className="btn btn-wa btn-sm"
                    href={whatsappUrls[job.id]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Meta({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <dt className="display text-[0.72rem] tracking-[0.12em] text-[var(--steel)] uppercase">
        {label}
      </dt>
      <dd
        className={`mt-1 text-[1.05rem] leading-snug ${
          accent ? "display text-[1.25rem] text-[#f45905]" : "text-[var(--navy)]"
        }`}
      >
        {value || "—"}
      </dd>
    </div>
  );
}
