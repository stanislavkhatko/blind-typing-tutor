import { NextRequest, NextResponse } from "next/server";
import { changePasswordByUserId, getSessionUser } from "@/server/authService";

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

    const body = (await request.json()) as {
      currentPassword?: string;
      newPassword?: string;
    };
    const result = changePasswordByUserId(
      sessionUser.id,
      body.currentPassword ?? "",
      body.newPassword ?? ""
    );
    return NextResponse.json(result, { status: result.ok ? 200 : 400 });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Ungültige Anfrage." },
      { status: 400 }
    );
  }
}
