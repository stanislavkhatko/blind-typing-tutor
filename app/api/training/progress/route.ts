import { NextRequest, NextResponse } from "next/server";
import { getKeyboardProgressForUser, getSessionUser } from "@/server/authService";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const sessionToken = request.cookies.get("auth_session")?.value ?? "";
  const sessionUser = getSessionUser(sessionToken);

  if (!sessionUser) {
    return NextResponse.json(
      { ok: false, message: "Bitte zuerst einloggen." },
      { status: 401 }
    );
  }

  const progress = getKeyboardProgressForUser(sessionUser.id);
  return NextResponse.json({ ok: true, ...progress });
}

