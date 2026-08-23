import { NextResponse } from "next/server";
import { createSession, loginUser } from "@/server/authService";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { username?: string; password?: string };
    const result = loginUser(body.username ?? "", body.password ?? "");
    if (!result.ok) {
      return NextResponse.json(result, { status: 400 });
    }

    const sessionToken = createSession(result.userId);
    const response = NextResponse.json(
      { ok: true, message: result.message },
      { status: 200 }
    );
    response.cookies.set("auth_session", sessionToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 15,
    });

    return response;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Ungültige Anfrage." },
      { status: 400 }
    );
  }
}
