"use client";

import { useEffect, useRef, useState } from "react";
import { TrendingUp, Package, Clock, Globe } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: 20,
    suffix: "+",
    label: "Лет на рынке",
    sub: "с 2004 года",
  },
  {
    icon: Package,
    value: 20000,
    suffix: "+",
    label: "Выполненных заказов",
    sub: "за всё время работы",
  },
  {
    icon: Clock,
    value: 24,
    suffix: "/7",
    label: "На связи",
    sub: "без выходных и праздников",
  },
  {
    icon: Globe,
    value: 50,
    suffix: "+",
    label: "Стран и направлений",
    sub: "международная сеть",
  },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString("ru-RU")}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0D1B2E 0%, #102040 50%, #0D1B2E 100%)",
      }}
    >
      {/* Glow center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.12)_0%,_transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-dark-900/50 border border-blue-500/15 hover:border-blue-500/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600/15 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600/25 transition-colors">
                  <Icon size={22} className="text-blue-400" />
                </div>
                <div className="text-3xl xl:text-4xl font-black text-white mb-1">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-slate-300 font-medium">{stat.label}</div>
                <div className="text-slate-500 text-sm mt-0.5">{stat.sub}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
