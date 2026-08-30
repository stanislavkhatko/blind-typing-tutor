import { NextRequest, NextResponse } from "next/server";
import { getSessionUser, registerUser } from "@/server/authService";
import type { UserRole } from "@/types/auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
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

    const body = (await request.json()) as {
      username?: string;
      password?: string;
      role?: UserRole;
    };
    const result = registerUser(body.username ?? "", body.password ?? "", body.role);
    return NextResponse.json(result, { status: result.ok ? 200 : 400 });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Ungültige Anfrage." },
      { status: 400 }
    );
  }
}
