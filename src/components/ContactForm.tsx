"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle, AlertCircle, MapPin, Phone, Mail, Clock } from "lucide-react";

interface FormState {
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

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  containerType: "20DC",
  quantity: "1",
  portFrom: "",
  portTo: "",
  specialCargo: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setForm(initialForm);
      } else {
        setError(data.error ?? "Произошла ошибка. Попробуйте снова.");
      }
    } catch {
      setError("Не удалось отправить заявку. Проверьте подключение к интернету.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacts" className="py-24 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
            Свяжитесь с нами
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">Оставить заявку</h2>
          <div className="mt-4 w-16 h-1 bg-blue-600 mx-auto rounded-full" />
          <p className="mt-4 text-slate-400 max-w-md mx-auto">
            Заполните форму, и наш менеджер свяжется с вами в течение 30 минут в рабочее время
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="p-5 rounded-2xl bg-dark-700 border border-white/8">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-600/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={17} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Адрес</div>
                  <div className="text-slate-400 text-sm mt-0.5 leading-snug">
                    г. Санкт-Петербург, пр. Стачек 48/2, БЦ «Империал»
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-dark-700 border border-white/8">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-600/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone size={17} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Телефон</div>
                  <a
                    href="tel:+78122003281"
                    className="text-blue-400 hover:text-blue-300 text-sm mt-0.5 block transition-colors"
                  >
                    +7 (812) 200-32-81
                  </a>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-dark-700 border border-white/8">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-600/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail size={17} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Email</div>
                  <a
                    href="mailto:info@easylogistics.ru"
                    className="text-blue-400 hover:text-blue-300 text-sm mt-0.5 block transition-colors"
                  >
                    info@easylogistics.ru
                  </a>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-dark-700 border border-white/8">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-600/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock size={17} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Режим работы</div>
                  <div className="text-slate-400 text-sm mt-0.5">На связи 24/7</div>
                  <div className="text-slate-500 text-xs mt-0.5">без выходных и праздников</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-dark-700 border border-white/8 text-slate-500 text-xs">
              ИНН: 7810001990
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {success ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 rounded-3xl bg-dark-700 border border-green-500/20">
                <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Заявка отправлена!</h3>
                <p className="text-slate-400 mb-6">
                  Спасибо! Наш менеджер свяжется с вами в ближайшее время.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-xl transition-colors"
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 rounded-3xl bg-dark-700 border border-white/8 space-y-4"
              >
                {/* Row 1 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-300 mb-1.5">
                      Имя <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Иван Иванов"
                      style={{ width:"100%", background:"#0a1628", border:"1px solid rgba(255,255,255,0.12)", color:"#f1f5f9", borderRadius:"12px", padding:"12px 16px", fontSize:"14px", outline:"none" }} className="placeholder-slate-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-1.5">
                      Телефон <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="+7 (___) ___-__-__"
                      style={{ width:"100%", background:"#0a1628", border:"1px solid rgba(255,255,255,0.12)", color:"#f1f5f9", borderRadius:"12px", padding:"12px 16px", fontSize:"14px", outline:"none" }} className="placeholder-slate-600"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm text-slate-300 mb-1.5">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="company@example.com"
                    style={{ width:"100%", background:"#0a1628", border:"1px solid rgba(255,255,255,0.12)", color:"#f1f5f9", borderRadius:"12px", padding:"12px 16px", fontSize:"14px", outline:"none" }} className="placeholder-slate-600"
                  />
                </div>

                {/* Container type & qty */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-300 mb-1.5">Тип контейнера</label>
                    <select
                      name="containerType"
                      value={form.containerType}
                      onChange={handleChange}
                      style={{ width:"100%", background:"#0a1628", border:"1px solid rgba(255,255,255,0.12)", color:"#f1f5f9", borderRadius:"12px", padding:"12px 16px", fontSize:"14px", outline:"none" }}
                    >
                      <option value="20DC">20&apos; DC</option>
                      <option value="40DC">40&apos; DC</option>
                      <option value="40HC">40&apos; HC</option>
                      <option value="REF">Рефрижераторный</option>
                      <option value="OTHER">Другой</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-1.5">Количество</label>
                    <input
                      type="number"
                      name="quantity"
                      min="1"
                      value={form.quantity}
                      onChange={handleChange}
                      style={{ width:"100%", background:"#0a1628", border:"1px solid rgba(255,255,255,0.12)", color:"#f1f5f9", borderRadius:"12px", padding:"12px 16px", fontSize:"14px", outline:"none" }}
                    />
                  </div>
                </div>

                {/* Ports */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-300 mb-1.5">Порт отправления</label>
                    <input
                      type="text"
                      name="portFrom"
                      value={form.portFrom}
                      onChange={handleChange}
                      placeholder="Shanghai, CN"
                      style={{ width:"100%", background:"#0a1628", border:"1px solid rgba(255,255,255,0.12)", color:"#f1f5f9", borderRadius:"12px", padding:"12px 16px", fontSize:"14px", outline:"none" }} className="placeholder-slate-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-1.5">Порт назначения</label>
                    <input
                      type="text"
                      name="portTo"
                      value={form.portTo}
                      onChange={handleChange}
                      placeholder="Санкт-Петербург, RU"
                      style={{ width:"100%", background:"#0a1628", border:"1px solid rgba(255,255,255,0.12)", color:"#f1f5f9", borderRadius:"12px", padding:"12px 16px", fontSize:"14px", outline:"none" }} className="placeholder-slate-600"
                    />
                  </div>
                </div>

                {/* Special cargo & message */}
                <div>
                  <label className="block text-sm text-slate-300 mb-1.5">
                    Особенности груза
                  </label>
                  <input
                    type="text"
                    name="specialCargo"
                    value={form.specialCargo}
                    onChange={handleChange}
                    placeholder="Опасный груз, температурный режим и т.д."
                    style={{ width:"100%", background:"#0a1628", border:"1px solid rgba(255,255,255,0.12)", color:"#f1f5f9", borderRadius:"12px", padding:"12px 16px", fontSize:"14px", outline:"none" }} className="placeholder-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-1.5">
                    Комментарий
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Дополнительная информация..."
                    style={{ width:"100%", background:"#0a1628", border:"1px solid rgba(255,255,255,0.12)", color:"#f1f5f9", borderRadius:"12px", padding:"12px 16px", fontSize:"14px", outline:"none", resize:"none" }} className="placeholder-slate-600"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    <AlertCircle size={15} className="flex-shrink-0" />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 glow-blue-sm hover:glow-blue"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Отправляем...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Отправить заявку
                    </>
                  )}
                </button>

                <p className="text-slate-600 text-xs text-center">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
