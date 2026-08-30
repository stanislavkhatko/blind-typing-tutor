import { NextRequest, NextResponse } from "next/server";
import {
  addMedicalTermByAdmin,
  getSessionUser,
  listMedicalTermsForAdmin,
} from "@/server/authService";

export const runtime = "nodejs";

function ensureAdmin(sessionToken: string) {
  const sessionUser = getSessionUser(sessionToken);
  if (!sessionUser) {
    return { ok: false as const, status: 401, message: "Bitte zuerst einloggen." };
  }
  if (sessionUser.role !== "admin") {
    return { ok: false as const, status: 403, message: "Keine Berechtigung." };
  }
  return { ok: true as const };
}

export async function GET(request: NextRequest) {
  const sessionToken = request.cookies.get("auth_session")?.value ?? "";
  const auth = ensureAdmin(sessionToken);
  if (!auth.ok) {
    return NextResponse.json({ ok: false, message: auth.message }, { status: auth.status });
  }
  return NextResponse.json(listMedicalTermsForAdmin());
}

export async function POST(request: NextRequest) {
  const sessionToken = request.cookies.get("auth_session")?.value ?? "";
  const auth = ensureAdmin(sessionToken);
  if (!auth.ok) {
    return NextResponse.json({ ok: false, message: auth.message }, { status: auth.status });
  }

  try {
    const body = (await request.json()) as { term?: string };
    const result = addMedicalTermByAdmin(body.term ?? "");
    return NextResponse.json(result, { status: result.ok ? 200 : 400 });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Ungültige Anfrage." },
      { status: 400 }
    );
  }
}

