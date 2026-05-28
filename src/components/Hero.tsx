"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

const slides = [
  {
    headline: "Надёжная логистика\nдля вашего бизнеса",
    sub: "Международные перевозки морем, воздухом и авто с 2004 года",
  },
  {
    headline: "Авиаперевозки\nв любую точку мира",
    sub: "Срочные грузы доставим воздушным путём по оптимальному маршруту",
  },
  {
    headline: "Автомобильная\nтранспортировка",
    sub: "Международные и российские маршруты, целые и сборные грузы",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % slides.length);
        setFading(false);
      }, 400);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(37,99,235,0.18) 0%, transparent 70%), #050B18",
      }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating blobs */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-float pointer-events-none" />
      <div
        className="absolute bottom-1/3 left-1/5 w-96 h-96 bg-blue-800/8 rounded-full blur-3xl animate-float pointer-events-none"
        style={{ animationDelay: "3s" }}
      />

      <div className="relative z-10 container mx-auto px-6 pt-28 pb-20 flex flex-col lg:flex-row items-center gap-12">
        {/* Text */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/15 border border-blue-500/25 text-blue-400 text-xs font-medium mb-6 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            Транспортно-экспедиторская компания
          </div>

          <h1
            className={`text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-tight mb-5 transition-opacity duration-400 whitespace-pre-line ${
              fading ? "opacity-0" : "opacity-100"
            }`}
          >
            {slide.headline.split("\n")[0]}
            <br />
            <span className="text-gradient">{slide.headline.split("\n")[1]}</span>
          </h1>

          <p
            className={`text-lg text-slate-400 mb-8 max-w-xl transition-opacity duration-400 ${
              fading ? "opacity-0" : "opacity-100"
            }`}
          >
            {slide.sub}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <a
              href="#contacts"
              className="flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 glow-blue hover:scale-105"
            >
              Оставить заявку
              <ArrowRight size={18} />
            </a>
            <a
              href="#calculator"
              className="flex items-center justify-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/40 text-white font-medium rounded-xl transition-all duration-200"
            >
              Рассчитать стоимость
            </a>
          </div>

          {/* Slide indicators */}
          <div className="flex gap-2 mt-8 justify-center lg:justify-start">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-blue-500" : "w-3 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600">
        <span className="text-xs uppercase tracking-widest">Прокрутите</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}
