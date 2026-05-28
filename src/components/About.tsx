"use client";

import { Globe, Users, ShieldCheck, Clock } from "lucide-react";

const highlights = [
  {
    icon: Globe,
    title: "Мультимодальность",
    text: "Объединяем морской, авиа и автомобильный транспорт в одном маршруте для оптимального результата.",
  },
  {
    icon: Users,
    title: "Персональный менеджер",
    text: "Каждый клиент получает персонального менеджера и ежедневную информацию о статусе груза.",
  },
  {
    icon: ShieldCheck,
    title: "100% в правовом поле",
    text: "Безупречный документооборот, полная ценовая прозрачность — никаких скрытых сборов и комиссий.",
  },
  {
    icon: Clock,
    title: "На связи 24/7",
    text: "Работаем круглосуточно, без праздников и выходных — ваш груз всегда под контролем.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      {/* Section separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="container mx-auto px-6">
        {/* Section label */}
        <div className="text-center mb-16">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
            О компании
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">
            Ваш надёжный партнёр в логистике
          </h2>
          <div className="mt-4 w-16 h-1 bg-blue-600 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text block */}
          <div>
            <p className="text-slate-300 text-lg leading-relaxed mb-5">
              <span className="text-white font-semibold">«Изи Лоджистикс»</span> — транспортно-экспедиторская компания,
              расположенная в Санкт-Петербурге. Мы оказываем широкий спектр соответствующих
              международным стандартам услуг по организации транспортировки грузов по суше, воде и
              воздуху.
            </p>
            <p className="text-slate-400 leading-relaxed mb-5">
              Наша активность сосредоточена на международной транспортировке грузов и перевозках по
              России. Вне зависимости от объёма поставки — одна паллета или партия контейнеров — мы
              создаём индивидуальные, надёжные и экономичные решения.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Мы объединяем разные виды транспорта и сопутствующие услуги, организуя перевозку от
              поступления начального запроса до предоставления отчётных документов по её завершении.
            </p>

            <div className="mt-8 flex gap-4 flex-wrap">
              <div className="px-5 py-3 rounded-xl bg-dark-700 border border-white/8 text-center">
                <div className="text-2xl font-bold text-blue-400">20+</div>
                <div className="text-xs text-slate-500 mt-0.5">лет на рынке</div>
              </div>
              <div className="px-5 py-3 rounded-xl bg-dark-700 border border-white/8 text-center">
                <div className="text-2xl font-bold text-blue-400">20 000+</div>
                <div className="text-xs text-slate-500 mt-0.5">выполненных заказов</div>
              </div>
              <div className="px-5 py-3 rounded-xl bg-dark-700 border border-white/8 text-center">
                <div className="text-2xl font-bold text-blue-400">ИНН</div>
                <div className="text-xs text-slate-500 mt-0.5">7810001990</div>
              </div>
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-2xl bg-dark-700 border border-white/8 card-hover group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600/15 flex items-center justify-center mb-4 group-hover:bg-blue-600/25 transition-colors">
                    <Icon size={20} className="text-blue-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-1.5">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
