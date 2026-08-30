import { NextRequest, NextResponse } from "next/server";
import { completeKeyboardPhaseForSession, getSessionUser } from "@/server/authService";
import { getSessionRemainingMs, getSessionTrainingPhase } from "@/utils/sessionTraining";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const sessionToken = request.cookies.get("auth_session")?.value ?? "";
  const sessionUser = getSessionUser(sessionToken);

  if (!sessionUser) {
    return NextResponse.json(
      { ok: false, message: "Bitte zuerst einloggen." },
      { status: 401 }
    );
  }

  const currentPhase = getSessionTrainingPhase(getSessionRemainingMs(sessionUser.expiresAt));
  if (currentPhase === "phase1") {
    return NextResponse.json(
      { ok: false, message: "Phase 1 ist noch nicht abgeschlossen." },
      { status: 400 }
    );
  }

  const result = completeKeyboardPhaseForSession(sessionUser.id, sessionUser.expiresAt);
  return NextResponse.json(result);
}
