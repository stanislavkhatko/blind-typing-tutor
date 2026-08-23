import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/server/authService";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const sessionToken = request.cookies.get("auth_session")?.value ?? "";
  const user = getSessionUser(sessionToken);

  if (!user) {
    const response = NextResponse.json({ authenticated: false });
    if (sessionToken) {
      response.cookies.set("auth_session", "", { maxAge: 0, path: "/" });
    }
    return response;
  }

  return NextResponse.json({ authenticated: true, username: user.username, expiresAt: user.expiresAt });
}
