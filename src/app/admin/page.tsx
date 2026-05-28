"use client";

import { useState } from "react";
import {
  Lock, LogOut, RefreshCw, Anchor,
  ChevronDown, ChevronUp, CheckCircle2, Circle,
  Phone, Mail, Package, MapPin, MessageSquare,
} from "lucide-react";

interface Submission {
  id: string;
  createdAt: string;
  status: "new" | "done";
  name: string;
  email: string;
  phone: string;
  containerType: string;
  quantity: string;
  portFrom: string;
  portTo: string;
  specialCargo: string;
  message: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "new" | "done">("all");

  // ── Авторизация ──────────────────────────────
  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/submissions", {
        headers: { Authorization: `Bearer ${password}` },
      });
      const data = await res.json();
      if (data.success) {
        setSubmissions(data.submissions);
        setLoggedIn(true);
      } else {
        setError("Неверный пароль");
      }
    } catch {
      setError("Ошибка подключения");
    } finally {
      setLoading(false);
    }
  };

  // ── Обновить список ──────────────────────────
  const refresh = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/submissions", {
        headers: { Authorization: `Bearer ${password}` },
      });
      const data = await res.json();
      if (data.success) setSubmissions(data.submissions);
    } finally {
      setLoading(false);
    }
  };

  // ── Сменить статус заявки ────────────────────
  const toggleStatus = async (sub: Submission) => {
    const newStatus = sub.status === "new" ? "done" : "new";
    // Обновляем локально сразу (оптимистично)
    setSubmissions((prev) =>
      prev.map((s) => (s.id === sub.id ? { ...s, status: newStatus } : s))
    );
    try {
      await fetch(`/api/admin/submissions/${sub.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch {
      // Откатываем если ошибка
      setSubmissions((prev) =>
        prev.map((s) => (s.id === sub.id ? { ...s, status: sub.status } : s))
      );
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("ru-RU", { dateStyle: "short", timeStyle: "short" });

  const filtered = submissions.filter((s) => filter === "all" || s.status === filter);
  const newCount = submissions.filter((s) => s.status === "new").length;
  const doneCount = submissions.filter((s) => s.status === "done").length;

  // ── Экран входа ──────────────────────────────
  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#050B18" }}>
        <div className="w-full max-w-sm p-8 rounded-2xl" style={{ background: "#0D1B2E", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
              <Anchor size={17} className="text-white" />
            </div>
            <span className="text-white font-bold text-lg">Easy Logistics</span>
          </div>
          <h1 className="text-white text-xl font-bold text-center mb-6">Панель администратора</h1>
          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль..."
                style={{ width: "100%", background: "#0a1628", border: "1px solid rgba(255,255,255,0.12)", color: "#f1f5f9", borderRadius: "12px", padding: "12px 16px", fontSize: "14px", outline: "none" }}
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
              style={{ background: "#2563eb" }}
            >
              <Lock size={16} />
              {loading ? "Вход..." : "Войти"}
            </button>
          </form>
          <p className="text-slate-600 text-xs text-center mt-4">
            Пароль по умолчанию: <span className="text-slate-500">admin123</span>
          </p>
        </div>
      </div>
    );
  }

  // ── Главный экран ────────────────────────────
  return (
    <div className="min-h-screen" style={{ background: "#050B18" }}>
      {/* Шапка */}
      <div className="px-6 py-4 flex items-center justify-between" style={{ background: "#070E1E", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
            <Anchor size={14} className="text-white" />
          </div>
          <span className="text-white font-bold">Easy Logistics — Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={refresh}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-400 hover:text-white rounded-lg transition-colors"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Обновить
          </button>
          <button
            onClick={() => { setLoggedIn(false); setPassword(""); }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-400 hover:text-red-300 rounded-lg transition-colors"
            style={{ background: "rgba(239,68,68,0.08)" }}
          >
            <LogOut size={14} />
            Выйти
          </button>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        {/* Статистика */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="px-4 py-2.5 rounded-xl text-sm" style={{ background: "#0D1B2E", border: "1px solid rgba(255,255,255,0.07)" }}>
            <span className="text-slate-400">Всего: </span>
            <span className="text-white font-bold">{submissions.length}</span>
          </div>
          <div className="px-4 py-2.5 rounded-xl text-sm" style={{ background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.2)" }}>
            <span className="text-yellow-400">Новых: </span>
            <span className="text-white font-bold">{newCount}</span>
          </div>
          <div className="px-4 py-2.5 rounded-xl text-sm" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
            <span className="text-green-400">Обработано: </span>
            <span className="text-white font-bold">{doneCount}</span>
          </div>
        </div>

        {/* Фильтры */}
        <div className="flex gap-2 mb-5">
          {(["all", "new", "done"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-1.5 rounded-lg text-sm transition-all"
              style={{
                background: filter === f ? "#2563eb" : "rgba(255,255,255,0.05)",
                color: filter === f ? "#fff" : "#94a3b8",
                border: filter === f ? "1px solid #2563eb" : "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {f === "all" ? "Все" : f === "new" ? "Новые" : "Обработанные"}
            </button>
          ))}
        </div>

        {/* Список заявок */}
        {filtered.length === 0 ? (
          <div className="text-center text-slate-500 py-20">Заявок нет</div>
        ) : (
          <div className="space-y-3">
            {filtered.map((sub) => {
              const isOpen = expanded === sub.id;
              const isDone = sub.status === "done";

              return (
                <div
                  key={sub.id}
                  className="rounded-2xl overflow-hidden transition-all"
                  style={{
                    background: "#0D1B2E",
                    border: isDone
                      ? "1px solid rgba(34,197,94,0.2)"
                      : "1px solid rgba(234,179,8,0.25)",
                  }}
                >
                  {/* Строка заявки */}
                  <div className="flex items-center gap-3 p-4">
                    {/* Кнопка статуса */}
                    <button
                      onClick={() => toggleStatus(sub)}
                      title={isDone ? "Пометить как новую" : "Пометить как обработанную"}
                      className="flex-shrink-0 transition-transform hover:scale-110"
                    >
                      {isDone ? (
                        <CheckCircle2 size={22} className="text-green-400" />
                      ) : (
                        <Circle size={22} className="text-yellow-400" />
                      )}
                    </button>

                    {/* Основная инфа */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1 min-w-0">
                      <div>
                        <div className="text-white font-semibold text-sm truncate">{sub.name}</div>
                        <div className="text-slate-500 text-xs">{formatDate(sub.createdAt)}</div>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-slate-300 truncate">
                        <Phone size={12} className="text-blue-400 flex-shrink-0" />
                        {sub.phone}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-blue-400 truncate">
                        <Mail size={12} className="flex-shrink-0" />
                        {sub.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm">
                        <Package size={12} className="text-slate-400 flex-shrink-0" />
                        <span
                          className="px-2 py-0.5 rounded-md text-xs font-medium"
                          style={{ background: "rgba(37,99,235,0.15)", color: "#93c5fd" }}
                        >
                          {sub.containerType || "—"} {sub.quantity ? `× ${sub.quantity}` : ""}
                        </span>
                      </div>
                    </div>

                    {/* Статус-бейдж */}
                    <div
                      className="hidden sm:flex flex-shrink-0 items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium"
                      style={{
                        background: isDone ? "rgba(34,197,94,0.12)" : "rgba(234,179,8,0.12)",
                        color: isDone ? "#4ade80" : "#fbbf24",
                      }}
                    >
                      {isDone ? "Обработана" : "Новая"}
                    </div>

                    {/* Раскрыть */}
                    <button
                      onClick={() => setExpanded(isOpen ? null : sub.id)}
                      className="flex-shrink-0 p-1 text-slate-500 hover:text-white transition-colors"
                    >
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </div>

                  {/* Развёрнутые детали */}
                  {isOpen && (
                    <div
                      className="px-5 pb-5 pt-3 grid sm:grid-cols-2 gap-4 text-sm"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      {sub.portFrom && (
                        <div className="flex items-start gap-2">
                          <MapPin size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-slate-500 text-xs mb-0.5">Маршрут</div>
                            <div className="text-slate-200">{sub.portFrom} → {sub.portTo || "?"}</div>
                          </div>
                        </div>
                      )}

                      {sub.specialCargo && (
                        <div className="flex items-start gap-2">
                          <Package size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-slate-500 text-xs mb-0.5">Особенности груза</div>
                            <div className="text-slate-200">{sub.specialCargo}</div>
                          </div>
                        </div>
                      )}

                      {sub.message && (
                        <div className="sm:col-span-2 flex items-start gap-2">
                          <MessageSquare size={14} className="text-slate-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-slate-500 text-xs mb-0.5">Комментарий</div>
                            <div className="text-slate-200 leading-relaxed">{sub.message}</div>
                          </div>
                        </div>
                      )}

                      {/* Кнопка смены статуса внизу */}
                      <div className="sm:col-span-2 flex gap-2 pt-2">
                        <button
                          onClick={() => toggleStatus(sub)}
                          className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                          style={{
                            background: isDone ? "rgba(234,179,8,0.12)" : "rgba(34,197,94,0.12)",
                            color: isDone ? "#fbbf24" : "#4ade80",
                            border: isDone ? "1px solid rgba(234,179,8,0.25)" : "1px solid rgba(34,197,94,0.25)",
                          }}
                        >
                          {isDone ? "← Вернуть в новые" : "✓ Отметить обработанной"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
