import { NextRequest, NextResponse } from "next/server";
import { getSubmissions } from "@/lib/db";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.replace("Bearer ", "").trim();

  if (token !== ADMIN_PASSWORD) {
    return NextResponse.json(
      { success: false, error: "Неверный пароль администратора." },
      { status: 401 }
    );
  }

  // Получаем все заявки из Neon PostgreSQL
  const submissions = await getSubmissions();

  return NextResponse.json({
    success: true,
    total: submissions.length,
    submissions,
  });
}
