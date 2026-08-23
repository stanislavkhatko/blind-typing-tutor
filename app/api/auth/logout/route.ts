import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "@/server/authService";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const sessionToken = request.cookies.get("auth_session")?.value ?? "";
  if (sessionToken) {
    deleteSession(sessionToken);
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("auth_session", "", { maxAge: 0, path: "/" });
  return response;
}
