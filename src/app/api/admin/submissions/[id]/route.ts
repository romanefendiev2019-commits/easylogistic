import { NextRequest, NextResponse } from "next/server";
import { updateStatus } from "@/lib/db";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.replace("Bearer ", "").trim();

  if (token !== ADMIN_PASSWORD) {
    return NextResponse.json({ success: false, error: "Нет доступа." }, { status: 401 });
  }

  const { id } = await params;
  const { status } = await req.json();

  if (status !== "new" && status !== "done") {
    return NextResponse.json({ success: false, error: "Неверный статус." }, { status: 400 });
  }

  const ok = await updateStatus(id, status);
  if (!ok) {
    return NextResponse.json({ success: false, error: "Заявка не найдена." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
