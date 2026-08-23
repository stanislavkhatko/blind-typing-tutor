import { NextResponse } from "next/server";
import { changePassword } from "@/server/authService";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      username?: string;
      currentPassword?: string;
      newPassword?: string;
    };
    const result = changePassword(
      body.username ?? "",
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
