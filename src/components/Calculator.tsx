"use client";

import { useState } from "react";
import { Calculator as CalcIcon, Loader2, AlertCircle, CheckCircle } from "lucide-react";

const containerTypes = [
  { value: "20DC", label: "20′ DC (стандартный)" },
  { value: "40DC", label: "40′ DC (стандартный)" },
  { value: "40HC", label: "40′ HC (High Cube)" },
  { value: "REF", label: "Рефрижераторный" },
  { value: "OTHER", label: "Другой" },
];

const routeTypes = [
  "Европа–Россия",
  "Азия–Россия",
  "Китай–Россия",
  "США–Россия",
  "Россия–Европа",
  "Другой маршрут",
];

const cargoTypes = [
  { value: "general", label: "Генеральный груз" },
  { value: "dangerous", label: "Опасный груз (DG)" },
  { value: "refrigerated", label: "Рефрижераторный" },
  { value: "oversized", label: "Негабаритный" },
];

// Общие инлайн-стили для всех полей ввода
const fieldStyle: React.CSSProperties = {
  width: "100%",
  background: "#0a1628",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "#f1f5f9",
  borderRadius: "12px",
  padding: "12px 16px",
  fontSize: "14px",
  outline: "none",
  appearance: "auto",
};

interface CalcResult {
  perUnitUSD: number;
  totalUSD: number;
  totalRUB: number;
  quantity: number;
  transitDays: string;
  disclaimer: string;
}

export default function Calculator() {
  const [form, setForm] = useState({
    containerType: "20DC",
    quantity: "1",
    routeType: "Китай–Россия",
    cargoType: "general",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CalcResult | null>(null);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setResult(null);
    setError("");
  };

  const calculate = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          containerType: form.containerType,
          quantity: Number(form.quantity),
          routeType: form.routeType,
          cargoType: form.cargoType,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.result);
      } else {
        setError(data.error ?? "Ошибка расчёта.");
      }
    } catch {
      setError("Не удалось подключиться к серверу.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="calculator"
      className="py-24 relative"
      style={{ background: "linear-gradient(180deg, #050B18 0%, #070E1E 100%)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.3), transparent)" }} />

      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Быстрый расчёт</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">Калькулятор стоимости доставки</h2>
          <div className="mt-4 mx-auto rounded-full" style={{ width: 64, height: 4, background: "#2563eb" }} />
          <p className="mt-4 text-slate-400 max-w-lg mx-auto">
            Получите ориентировочную стоимость за несколько секунд. Точный расчёт — от менеджера после заявки.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl p-8 md:p-10" style={{ background: "#0D1B2E", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="grid md:grid-cols-2 gap-5 mb-6">
              {/* Тип контейнера */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Тип контейнера</label>
                <select name="containerType" value={form.containerType} onChange={handleChange} style={fieldStyle}>
                  {containerTypes.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* Количество */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Количество контейнеров</label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  max="100"
                  value={form.quantity}
                  onChange={handleChange}
                  style={fieldStyle}
                />
              </div>

              {/* Направление */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Направление</label>
                <select name="routeType" value={form.routeType} onChange={handleChange} style={fieldStyle}>
                  {routeTypes.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              {/* Тип груза */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Тип груза</label>
                <select name="cargoType" value={form.cargoType} onChange={handleChange} style={fieldStyle}>
                  {cargoTypes.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={calculate}
              disabled={loading}
              className="w-full py-3.5 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
              style={{
                background: loading ? "#1e40af" : "#2563eb",
                boxShadow: "0 0 20px rgba(37,99,235,0.3)",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /> Рассчитываем...</>
              ) : (
                <><CalcIcon size={18} /> Рассчитать стоимость</>
              )}
            </button>

            {/* Ошибка */}
            {error && (
              <div className="mt-5 flex items-center gap-2 p-4 rounded-xl text-red-400 text-sm" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                <AlertCircle size={16} className="flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Результат */}
            {result && (
              <div className="mt-6 p-6 rounded-2xl" style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.25)" }}>
                <div className="flex items-center gap-2 text-blue-400 font-semibold mb-5">
                  <CheckCircle size={18} />
                  Результат расчёта
                </div>
                <div className="grid sm:grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">${result.perUnitUSD.toLocaleString("ru-RU")}</div>
                    <div className="text-slate-400 text-sm mt-0.5">за контейнер</div>
                  </div>
                  <div className="text-center" style={{ borderLeft: "1px solid rgba(255,255,255,0.08)", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="text-2xl font-bold text-amber-400">${result.totalUSD.toLocaleString("ru-RU")}</div>
                    <div className="text-slate-400 text-sm mt-0.5">итого × {result.quantity} шт.</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-400">≈ {result.totalRUB.toLocaleString("ru-RU")} ₽</div>
                    <div className="text-slate-400 text-sm mt-0.5">по курсу ~92 ₽/$</div>
                  </div>
                </div>
                <div className="text-center text-slate-300 text-sm mb-3">
                  Срок доставки: <span className="text-white font-medium">{result.transitDays} дней</span>
                </div>
                <p className="text-slate-500 text-xs text-center leading-relaxed mb-4">{result.disclaimer}</p>
                <div className="flex justify-center">
                  <a href="#contacts" className="px-6 py-2.5 text-white text-sm font-medium rounded-xl transition-colors" style={{ background: "#2563eb" }}>
                    Оставить заявку на перевозку
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
