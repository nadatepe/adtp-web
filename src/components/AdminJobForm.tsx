"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Job } from "@/lib/jobs";

type Props = {
  job?: Job;
  submitLabel: string;
  mode: "create" | "update";
  onSaved?: () => void;
};

export function AdminJobForm({ job, submitLabel, mode, onSaved }: Props) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    setPending(true);
    setError(null);
    setSaved(false);
    const form = new FormData(formEl);
    const payload = {
      yukleme_yeri: String(form.get("yukleme_yeri") ?? ""),
      sevk_yeri: String(form.get("sevk_yeri") ?? ""),
      arac_tipi: String(form.get("arac_tipi") ?? ""),
      yuk_nevi: String(form.get("yuk_nevi") ?? ""),
      navlun: String(form.get("navlun") ?? ""),
      aciklama: String(form.get("aciklama") ?? ""),
      published: form.get("published") === "on",
    };

    try {
      const res =
        mode === "create"
          ? await fetch("/api/admin/jobs", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(payload),
            })
          : await fetch(`/api/admin/jobs/${job!.id}`, {
              method: "PATCH",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(payload),
            });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Kayıt başarısız");
      }
      if (mode === "create") {
        formEl.reset();
      }
      setSaved(true);
      router.refresh();
      onSaved?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kayıt başarısız");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
      <div className="field">
        <label htmlFor={`${job?.id ?? "new"}-yukleme`}>Yükleme yeri</label>
        <input
          id={`${job?.id ?? "new"}-yukleme`}
          name="yukleme_yeri"
          defaultValue={job?.yukleme_yeri ?? ""}
          required
        />
      </div>
      <div className="field">
        <label htmlFor={`${job?.id ?? "new"}-sevk`}>Sevk yeri</label>
        <input
          id={`${job?.id ?? "new"}-sevk`}
          name="sevk_yeri"
          defaultValue={job?.sevk_yeri ?? ""}
          required
        />
      </div>
      <div className="field">
        <label htmlFor={`${job?.id ?? "new"}-arac`}>Araç tipi</label>
        <input
          id={`${job?.id ?? "new"}-arac`}
          name="arac_tipi"
          defaultValue={job?.arac_tipi ?? ""}
          placeholder="Örn. Tenteli Tır / Kırkayak"
        />
      </div>
      <div className="field">
        <label htmlFor={`${job?.id ?? "new"}-yuk`}>Yük nevi</label>
        <input
          id={`${job?.id ?? "new"}-yuk`}
          name="yuk_nevi"
          defaultValue={job?.yuk_nevi ?? ""}
          placeholder="Örn. Paletli gıda / İnşaat malzemesi"
        />
      </div>
      <div className="field">
        <label htmlFor={`${job?.id ?? "new"}-navlun`}>Navlun</label>
        <input
          id={`${job?.id ?? "new"}-navlun`}
          name="navlun"
          defaultValue={job?.navlun ?? ""}
          placeholder="Örn. 45.000 TL / teklif"
        />
      </div>
      <div className="field md:col-span-2">
        <label htmlFor={`${job?.id ?? "new"}-aciklama`}>Açıklama</label>
        <textarea
          id={`${job?.id ?? "new"}-aciklama`}
          name="aciklama"
          defaultValue={job?.aciklama ?? ""}
          placeholder="Yükleme saati, özel notlar…"
        />
      </div>
      <label className="flex items-center gap-2 text-sm text-[var(--ink)] md:col-span-2">
        <input
          type="checkbox"
          name="published"
          defaultChecked={job?.published ?? false}
        />
        Yayında (Açık Sevkiyatlar sayfasında görünsün)
      </label>
      {error ? (
        <p className="text-sm text-red-800 md:col-span-2">{error}</p>
      ) : null}
      {saved ? (
        <p className="text-sm text-[#00215b] md:col-span-2">
          {mode === "create" ? "Kayıt listeye eklendi." : "Kayıt güncellendi."}
        </p>
      ) : null}
      <div className="md:col-span-2">
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? "Kaydediliyor…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
