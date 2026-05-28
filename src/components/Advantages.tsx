import {
  UserCheck,
  FileCheck,
  Award,
  Eye,
  DollarSign,
  Star,
} from "lucide-react";

const advantages = [
  {
    icon: UserCheck,
    title: "Персональный менеджер",
    desc: "Выделенный менеджер и ежедневное информирование о статусе груза на каждом этапе перевозки.",
  },
  {
    icon: FileCheck,
    title: "Безупречный документооборот",
    desc: "100% в правовом поле. Полный пакет документов, соответствующих всем требованиям законодательства.",
  },
  {
    icon: Award,
    title: "Накопленный опыт",
    desc: "Более 20 лет на рынке и тысячи выполненных заказов — у нас есть готовые решения для любых задач.",
  },
  {
    icon: Eye,
    title: "Внимание к деталям",
    desc: "Тщательность и аккуратность в каждом заказе. Мы не упускаем ни одну деталь в организации перевозки.",
  },
  {
    icon: DollarSign,
    title: "Полная ценовая прозрачность",
    desc: "Итоговая стоимость озвучивается с первой минуты. Никаких скрытых сборов, надбавок и комиссий.",
  },
  {
    icon: Star,
    title: "Репутация превыше всего",
    desc: "Мы дорожим репутацией и строим долгосрочные отношения с каждым клиентом на основе доверия.",
  },
];

export default function Advantages() {
  return (
    <section id="advantages" className="py-24 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
            Почему выбирают нас
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">Наши преимущества</h2>
          <div className="mt-4 w-16 h-1 bg-blue-600 mx-auto rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((adv, i) => {
            const Icon = adv.icon;
            return (
              <div
                key={adv.title}
                className="group relative p-6 rounded-2xl bg-dark-700 border border-white/8 card-hover overflow-hidden"
              >
                {/* Number watermark */}
                <div className="absolute top-3 right-4 text-6xl font-black text-white/3 select-none leading-none">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center mb-5 group-hover:bg-blue-600/25 group-hover:border-blue-500/40 transition-all duration-300">
                    <Icon size={21} className="text-blue-400" />
                  </div>
                  <h3 className="text-white font-semibold text-base mb-2">{adv.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{adv.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
