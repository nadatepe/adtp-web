import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { createJob, listAllJobs } from "@/lib/jobs";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const jobs = await listAllJobs();
  return NextResponse.json(jobs, {
    headers: { "cache-control": "private, no-store" },
  });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const job = await createJob({
      yukleme_yeri: String(body.yukleme_yeri ?? ""),
      sevk_yeri: String(body.sevk_yeri ?? ""),
      arac_tipi: String(body.arac_tipi ?? ""),
      yuk_nevi: String(body.yuk_nevi ?? ""),
      navlun: String(body.navlun ?? ""),
      aciklama: String(body.aciklama ?? ""),
      published: Boolean(body.published),
    });
    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "create_failed";
    console.error("create job failed", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
