"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, Anchor } from "lucide-react";

const navLinks = [
  { href: "#about", label: "О компании" },
  { href: "#services", label: "Услуги" },
  { href: "#advantages", label: "Преимущества" },
  { href: "#calculator", label: "Калькулятор" },
  { href: "#contacts", label: "Контакты" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(7,14,30,0.95)" : "rgba(7,14,30,0.7)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.4)" : "none",
      }}
    >
      {/* Top bar — телефон и email */}
      <div className="hidden md:block border-b border-white/5">
        <div className="container mx-auto px-6 py-1.5 flex justify-end gap-6 text-xs text-slate-500">
          <a href="tel:+78122003281" className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
            <Phone size={11} />
            +7 (812) 200-32-81
          </a>
          <a href="mailto:info@easylogistics.ru" className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
            <Mail size={11} />
            info@easylogistics.ru
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform" style={{ boxShadow: "0 0 15px rgba(37,99,235,0.4)" }}>
            <Anchor size={18} className="text-white" />
          </div>
          <div className="leading-tight">
            <div className="font-bold text-white text-lg tracking-tight">
              Easy<span className="text-blue-400 ml-1">Logistics</span>
            </div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest -mt-0.5">с 2004 года</div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contacts"
          className="hidden lg:flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-all duration-200"
          style={{ boxShadow: "0 0 15px rgba(37,99,235,0.35)" }}
        >
          Оставить заявку
        </a>

        {/* Mobile burger */}
        <button
          className="lg:hidden p-2 text-slate-300 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-white/8 px-6 py-4 flex flex-col gap-1" style={{ background: "rgba(7,14,30,0.98)" }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-2.5 text-slate-300 hover:text-white border-b border-white/5 last:border-0"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacts"
            className="mt-3 py-3 bg-blue-600 hover:bg-blue-500 text-white text-center rounded-lg font-medium transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Оставить заявку
          </a>
        </div>
      )}
    </header>
  );
}
