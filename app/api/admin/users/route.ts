import { NextRequest, NextResponse } from "next/server";
import { getSessionUser, listUsersForAdmin } from "@/server/authService";

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

  if (sessionUser.role !== "admin") {
    return NextResponse.json(
      { ok: false, message: "Keine Berechtigung." },
      { status: 403 }
    );
  }

  const users = listUsersForAdmin();
  return NextResponse.json({ users, currentUserId: sessionUser.id });
}
