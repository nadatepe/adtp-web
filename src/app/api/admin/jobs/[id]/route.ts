import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { deleteJob, setJobPublished, updateJob } from "@/lib/jobs";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, ctx: Ctx) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const body = (await request.json()) as Record<string, unknown>;

  if (typeof body.published === "boolean" && Object.keys(body).length === 1) {
    const job = await setJobPublished(id, body.published);
    if (!job) return NextResponse.json({ error: "not_found" }, { status: 404 });
    return NextResponse.json(job);
  }

  const job = await updateJob(id, {
    yukleme_yeri: String(body.yukleme_yeri ?? ""),
    sevk_yeri: String(body.sevk_yeri ?? ""),
    arac_tipi: String(body.arac_tipi ?? ""),
    yuk_nevi: String(body.yuk_nevi ?? ""),
    navlun: String(body.navlun ?? ""),
    aciklama: String(body.aciklama ?? ""),
    published: Boolean(body.published),
  });
  if (!job) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json(job);
}

export async function DELETE(_request: Request, ctx: Ctx) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const ok = await deleteJob(id);
  if (!ok) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return new NextResponse(null, { status: 204 });
}
