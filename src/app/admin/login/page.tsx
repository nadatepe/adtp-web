import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Yönetim Girişi",
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }
  const params = await searchParams;
  const hasError = params.error === "1";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f5f8] px-4 py-16">
      <div className="w-full max-w-md border-t-8 border-[#f45905] bg-white p-8 shadow-[0_18px_40px_rgba(0,33,91,0.08)]">
        <p className="eyebrow">Yönetim</p>
        <h1 className="display text-3xl text-[var(--navy)]">Admin girişi</h1>
        <p className="mt-2 text-sm text-[var(--steel)]">
          Tek kullanıcı. Şifre <code className="text-[var(--ink)]">ADMIN_PASSWORD</code>{" "}
          ortam değişkeninden okunur.
        </p>

        {hasError ? (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
            Şifre hatalı. Tekrar deneyin.
          </p>
        ) : null}

        <form
          action="/api/admin/login"
          method="post"
          className="mt-6 flex flex-col gap-4"
        >
          <div className="field">
            <label htmlFor="password">Şifre</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="Admin şifresi"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Giriş yap
          </button>
        </form>

        <p className="mt-6 text-sm text-[var(--steel)]">
          <Link href="/" className="underline underline-offset-4">
            Ana sayfaya dön
          </Link>
        </p>
      </div>
    </main>
  );
}
