/**
 * POST /api/calculator
 * Рассчитывает примерную стоимость доставки груза.
 * Логика упрощённая — для реального проекта нужно интегрировать фрахтовый API.
 */

import { NextRequest, NextResponse } from "next/server";

// Базовые тарифы по типам контейнеров (USD)
const BASE_RATES: Record<string, number> = {
  "20DC": 1200,
  "40DC": 1800,
  "40HC": 2000,
  REF: 3500,
  OTHER: 1500,
};

// Коэффициенты дальности маршрутов (упрощённые регионы)
const ROUTE_MULTIPLIERS: Record<string, number> = {
  "Европа–Россия": 1.0,
  "Азия–Россия": 1.6,
  "США–Россия": 2.2,
  "Китай–Россия": 1.5,
  "Россия–Европа": 1.1,
  "Другой маршрут": 1.8,
};

// Надбавки за тип груза
const CARGO_SURCHARGES: Record<string, number> = {
  general: 0,
  dangerous: 800,
  refrigerated: 1200,
  oversized: 1500,
};

interface CalculatorRequest {
  containerType: string;
  quantity: number;
  routeType: string;
  cargoType: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: CalculatorRequest = await req.json();

    const { containerType, quantity, routeType, cargoType } = body;

    if (!containerType || !quantity || quantity < 1) {
      return NextResponse.json(
        { success: false, error: "Укажите тип и количество контейнеров." },
        { status: 400 }
      );
    }

    const baseRate = BASE_RATES[containerType] ?? BASE_RATES["OTHER"];
    const routeMultiplier = ROUTE_MULTIPLIERS[routeType] ?? 1.8;
    const cargoSurcharge = CARGO_SURCHARGES[cargoType] ?? 0;

    const qty = Math.min(Math.max(Number(quantity), 1), 100);

    // Скидка на объём
    const volumeDiscount = qty >= 10 ? 0.9 : qty >= 5 ? 0.95 : 1.0;

    const perUnit = Math.round(baseRate * routeMultiplier + cargoSurcharge);
    const total = Math.round(perUnit * qty * volumeDiscount);

    // Перевод в рубли по условному курсу
    const USD_RUB = 92;
    const totalRub = total * USD_RUB;

    const transitDays: Record<string, string> = {
      "Европа–Россия": "7–14",
      "Азия–Россия": "25–45",
      "США–Россия": "30–50",
      "Китай–Россия": "20–35",
      "Россия–Европа": "7–14",
      "Другой маршрут": "21–60",
    };

    return NextResponse.json({
      success: true,
      result: {
        perUnitUSD: perUnit,
        totalUSD: total,
        totalRUB: totalRub,
        quantity: qty,
        transitDays: transitDays[routeType] ?? "21–60",
        disclaimer:
          "Расчёт является ориентировочным. Точная стоимость определяется после обработки заявки менеджером.",
      },
    });
  } catch (error) {
    console.error("Calculator API error:", error);
    return NextResponse.json(
      { success: false, error: "Ошибка расчёта. Попробуйте позже." },
      { status: 500 }
    );
  }
}
