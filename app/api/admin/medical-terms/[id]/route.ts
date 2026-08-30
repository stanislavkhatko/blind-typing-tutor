import { NextRequest, NextResponse } from "next/server";
import { deleteMedicalTermByAdmin, getSessionUser } from "@/server/authService";

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
  const termId = Number(id);
  if (!Number.isInteger(termId) || termId <= 0) {
    return NextResponse.json(
      { ok: false, message: "Ungültige Fachbegriff-ID." },
      { status: 400 }
    );
  }

  const result = deleteMedicalTermByAdmin(termId);
  if (!result.ok) {
    const status = result.message === "Fachbegriff wurde nicht gefunden." ? 404 : 400;
    return NextResponse.json(result, { status });
  }
  return NextResponse.json({
    ok: true,
    message: `Fachbegriff '${result.term}' wurde gelöscht.`,
  });
}

