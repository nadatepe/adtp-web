"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminJobForm } from "@/components/AdminJobForm";
import type { Job } from "@/lib/jobs";

type Props = {
  jobs: Job[];
};

export function AdminJobTable({ jobs }: Props) {
  const router = useRouter();
  const [editing, setEditing] = useState<Job | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);

  useEffect(() => {
    if (!editing) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setEditing(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [editing]);

  async function toggle(job: Job) {
    setPendingId(job.id);
    await fetch(`/api/admin/jobs/${job.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ published: !job.published }),
    });
    router.refresh();
    setPendingId(null);
  }

  async function remove(job: Job) {
    const label = `${job.yukleme_yeri} → ${job.sevk_yeri}`;
    if (!confirm(`${label} silinsin mi?`)) return;
    setPendingId(job.id);
    await fetch(`/api/admin/jobs/${job.id}`, { method: "DELETE" });
    if (editing?.id === job.id) setEditing(null);
    router.refresh();
    setPendingId(null);
  }

  return (
    <>
      {jobs.length === 0 ? (
        <p className="text-[var(--steel)]">Henüz iş yok. Yukarıdan ekleyin.</p>
      ) : (
        <div className="table-wrap">
          <table className="admin-table min-w-[880px]">
            <thead>
              <tr>
                <th>Güzergâh</th>
                <th>Araç</th>
                <th>Yük</th>
                <th>Navlun</th>
                <th>Durum</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => {
                const busy = pendingId === job.id;
                return (
                  <tr key={job.id}>
                    <td>
                      <p className="display text-[1.02rem] leading-tight text-[var(--navy)]">
                        {job.yukleme_yeri || "—"}
                        <span className="mx-1.5 text-[#f45905]">→</span>
                        {job.sevk_yeri || "—"}
                      </p>
                      {job.aciklama ? (
                        <p className="mt-1 max-w-xs text-xs leading-snug text-[var(--steel)]">
                          {job.aciklama}
                        </p>
                      ) : null}
                    </td>
                    <td>{job.arac_tipi || "—"}</td>
                    <td>{job.yuk_nevi || "—"}</td>
                    <td className="display whitespace-nowrap text-[#f45905]">
                      {job.navlun || "—"}
                    </td>
                    <td>
                      <span className={`badge ${job.published ? "badge-on" : "badge-off"}`}>
                        {job.published ? "Yayında" : "Taslak"}
                      </span>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1.5">
                        <button
                          type="button"
                          className="btn btn-outline btn-xs"
                          onClick={() => setEditing(job)}
                        >
                          Düzenle
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline btn-xs"
                          disabled={busy}
                          onClick={() => toggle(job)}
                        >
                          {job.published ? "Kaldır" : "Yayınla"}
                        </button>
                        <button
                          type="button"
                          className="btn btn-xs"
                          style={{ background: "#7f1d1d", color: "white" }}
                          disabled={busy}
                          onClick={() => remove(job)}
                        >
                          Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {editing ? (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-[#00215b]/60 px-4 py-8"
          onClick={() => setEditing(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="job-edit-title"
            className="w-full max-w-2xl bg-white shadow-[0_24px_60px_rgba(0,33,91,0.28)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 bg-[#00215b] px-5 py-4 text-white">
              <div>
                <p className="eyebrow">Düzenle</p>
                <h2 id="job-edit-title" className="display text-2xl text-white">
                  {editing.yukleme_yeri} → {editing.sevk_yeri}
                </h2>
              </div>
              <button
                type="button"
                className="btn btn-ghost btn-xs"
                onClick={() => setEditing(null)}
              >
                Kapat
              </button>
            </div>
            <div className="p-5">
              <AdminJobForm
                key={editing.id}
                mode="update"
                job={editing}
                submitLabel="Güncelle"
                onSaved={() => setEditing(null)}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
