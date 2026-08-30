import { NextRequest, NextResponse } from "next/server";
import { deleteUserByAdmin, getSessionUser } from "@/server/authService";

export const runtime = "nodejs";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
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

  const { id } = await context.params;
  const targetUserId = Number(id);
  if (!Number.isInteger(targetUserId) || targetUserId <= 0) {
    return NextResponse.json(
      { ok: false, message: "Ungültige Benutzer-ID." },
      { status: 400 }
    );
  }

  const result = deleteUserByAdmin(sessionUser.id, targetUserId);
  if (!result.ok) {
    const status = result.message === "Benutzer wurde nicht gefunden." ? 404 : 400;
    return NextResponse.json(result, { status });
  }

  return NextResponse.json({
    ok: true,
    message: `Benutzer '${result.username}' wurde gelöscht.`,
  });
}

