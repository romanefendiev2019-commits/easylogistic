import { NextRequest, NextResponse } from "next/server";
import { saveSubmission } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, containerType, quantity, portFrom, portTo, specialCargo, message } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Заполните обязательные поля: имя, email и телефон." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Некорректный email-адрес." },
        { status: 400 }
      );
    }

    // Сохраняем в Neon PostgreSQL
    const submission = await saveSubmission({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      containerType: String(containerType || "").trim(),
      quantity: String(quantity || "").trim(),
      portFrom: String(portFrom || "").trim(),
      portTo: String(portTo || "").trim(),
      specialCargo: String(specialCargo || "").trim(),
      message: String(message || "").trim(),
    });

    return NextResponse.json(
      { success: true, message: "Заявка успешно отправлена!", id: submission.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "Ошибка сервера. Попробуйте позже." },
      { status: 500 }
    );
  }
}
