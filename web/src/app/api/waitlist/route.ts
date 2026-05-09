import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { email: rawEmail, name: rawName } = body as {
    email?: unknown;
    name?: unknown;
  };

  const email =
    typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";
  const name =
    typeof rawName === "string" ? rawName.trim() || null : null;

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();
  if (!supabase) {
    console.error("Waitlist API: missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    return NextResponse.json({ error: "misconfigured" }, { status: 503 });
  }

  const { error } = await supabase.from("waitlist").insert({ email, name });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "duplicate" }, { status: 409 });
    }
    console.error("Waitlist insert:", error.message, error.code);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
