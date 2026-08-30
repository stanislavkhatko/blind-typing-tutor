import { NextRequest, NextResponse } from "next/server";
import { getSessionUser, listMedicalTermsForTraining } from "@/server/authService";

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

  return NextResponse.json({ terms: listMedicalTermsForTraining() });
}

