"use client";

import { useState } from "react";
import { Ship, Truck, Plane, Anchor, FileText, Package, ChevronDown } from "lucide-react";

const services = [
  {
    icon: Ship,
    title: "Транспортировка в контейнерах",
    short: "Международная мультимодальная перевозка морем",
    full: [
      "Морская транспортировка порт/порт",
      "Транспортировка порт Санкт-Петербург / конечное место назначения — экспедирование в порту + вывоз в место назначения",
      "Транспортировка дверь/дверь = морская транспортировка порт/порт + наземная транспортировка в странах отправления и назначения",
      "Морской фрахт от ведущих мировых и региональных контейнерных перевозчиков",
      "Генеральные, опасные, рефрижераторные и негабаритные грузы",
    ],
    tags: ["20DC", "40DC/HC", "REF", "Негабарит"],
    color: "from-blue-600/20 to-blue-800/10",
  },
  {
    icon: Truck,
    title: "Автомобильная транспортировка",
    short: "Международные маршруты и перевозки по России",
    full: [
      "Международная автомобильная транспортировка",
      "Транспортировка по России",
      "Целые и сборные грузы",
      "Мультимодальные маршруты с другими видами транспорта",
    ],
    tags: ["FTL", "LTL", "Сборные"],
    color: "from-emerald-600/15 to-emerald-800/5",
  },
  {
    icon: Plane,
    title: "Авиатранспортировка",
    short: "Срочные международные грузоперевозки воздухом",
    full: [
      "Международная авиадоставка в любую точку мира",
      "Срочные и стандартные отправки",
      "Работа с ведущими авиационными грузовыми перевозчиками",
      "Консолидированные и чартерные рейсы",
    ],
    tags: ["Express", "Стандарт", "Чартер"],
    color: "from-violet-600/15 to-violet-800/5",
  },
  {
    icon: Anchor,
    title: "Экспедирование в порту СПб",
    short: "Собственные представители на всех терминалах",
    full: [
      "Первый Контейнерный Терминал (ПКТ)",
      "Петролеспорт (ПЛП)",
      "Контейнерный Терминал Санкт-Петербург (КТСП)",
      "Бронка, Морской Рыбный Порт (МРП), Моби Дик (МД)",
      "Услуги по перевалке контейнеров, досмотрам, документальному оформлению",
    ],
    tags: ["ПКТ", "ПЛП", "КТСП", "Бронка"],
    color: "from-cyan-600/15 to-cyan-800/5",
  },
  {
    icon: FileText,
    title: "Таможенное оформление",
    short: "Собственный таможенный специалист",
    full: [
      "Оформление экспортных грузов",
      "Оформление импортных грузов",
      "Транзитные грузы",
      "Консультирование по вопросам таможенного оформления",
      "Поддержка во внешнеэкономической деятельности (ВЭД)",
    ],
    tags: ["Экспорт", "Импорт", "Транзит", "ВЭД"],
    color: "from-amber-600/15 to-amber-800/5",
  },
  {
    icon: Package,
    title: "Обработка грузов",
    short: "Дробление, консолидация, перевалка",
    full: [
      "Дробление партий на более мелкие отправки",
      "Консолидация сборных грузов",
      "Перевалка с одного вида транспорта на другой",
      "Ответственное хранение на складах",
    ],
    tags: ["Консолидация", "Дробление", "Хранение"],
    color: "from-rose-600/15 to-rose-800/5",
  },
];

export default function Services() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="py-24"
      style={{ background: "linear-gradient(180deg, #070E1E 0%, #050B18 100%)" }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
            Что мы делаем
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">Наши услуги</h2>
          <div className="mt-4 w-16 h-1 bg-blue-600 mx-auto rounded-full" />
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            Полный спектр транспортно-экспедиторских услуг — от единственной паллеты до партии
            контейнеров
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const isOpen = expanded === idx;

            return (
              <div
                key={service.title}
                className={`rounded-2xl border border-white/8 overflow-hidden transition-all duration-300 ${
                  isOpen ? "border-blue-500/30" : "hover:border-white/15"
                }`}
                style={{
                  background: `linear-gradient(135deg, #0D1B2E, #102040)`,
                }}
              >
                <button
                  className="w-full p-6 text-left"
                  onClick={() => setExpanded(isOpen ? null : idx)}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${service.color} flex-shrink-0`}
                    >
                      <Icon size={22} className="text-white" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-base leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-slate-400 text-sm mt-1">{service.short}</p>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`text-slate-500 flex-shrink-0 mt-1 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-blue-400" : ""
                      }`}
                    />
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[11px] font-medium bg-blue-600/15 text-blue-300 rounded-md border border-blue-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>

                {/* Expanded details */}
                {isOpen && (
                  <div className="px-6 pb-6 border-t border-white/6 pt-4">
                    <ul className="space-y-2">
                      {service.full.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#contacts"
                      className="inline-flex items-center gap-1.5 mt-4 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
                    >
                      Запросить стоимость →
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
