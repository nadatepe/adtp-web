import { NextResponse } from "next/server";
import { checkAdminPassword, createAdminSession } from "@/lib/auth";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  let password = "";
  if (contentType.includes("application/json")) {
    const body = (await request.json()) as { password?: string };
    password = String(body.password ?? "");
  } else {
    const form = await request.formData();
    password = String(form.get("password") ?? "");
  }

  if (!checkAdminPassword(password)) {
    return NextResponse.redirect(new URL("/admin/login?error=1", request.url), 303);
  }
  await createAdminSession();
  return NextResponse.redirect(new URL("/admin", request.url), 303);
}
