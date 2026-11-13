import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminJobForm } from "@/components/AdminJobForm";
import { AdminJobTable } from "@/components/AdminJobTable";
import { isAdminAuthenticated } from "@/lib/auth";
import { listAllJobs } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "Yönetim Paneli",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const jobs = await listAllJobs();

  return (
    <main className="min-h-screen bg-[#f4f5f8] pb-16">
      <header className="bg-[#00215b] text-white">
        <div className="site-shell flex flex-wrap items-center justify-between gap-4 py-5">
          <div>
            <p className="eyebrow">Yeni Adatepe Nakliyat</p>
            <h1 className="display text-2xl text-white">Açık sevkiyat yönetimi</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/acik-sevkiyatlar" className="btn btn-ghost btn-sm">
              Canlı liste
            </Link>
            <Link href="/" className="btn btn-ghost btn-sm">
              Site
            </Link>
            <form action="/api/admin/logout" method="post">
              <button type="submit" className="btn btn-primary btn-sm">
                Çıkış
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="site-shell mt-8 grid gap-8">
        <section className="border border-[#00215b]/10 bg-white p-6">
          <h2 className="display text-2xl text-[var(--navy)]">Yeni iş ekle</h2>
          <p className="mt-1 text-sm text-[var(--steel)]">
            Alanlar şimdilik serbest metin. Yayınlayınca Açık Sevkiyatlar’da görünür.
          </p>
          <div className="mt-5">
            <AdminJobForm mode="create" submitLabel="Kaydet" />
          </div>
        </section>

        <section className="border border-[#00215b]/10 bg-white p-6">
          <div className="mb-4 flex items-end justify-between gap-3">
            <h2 className="display text-2xl text-[var(--navy)]">Kayıtlı işler</h2>
            <p className="text-sm text-[var(--steel)]">{jobs.length} kayıt</p>
          </div>

          <AdminJobTable jobs={jobs} />
        </section>
      </div>
    </main>
  );
}
