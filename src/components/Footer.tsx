import { Anchor, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="py-12 border-t border-white/8"
      style={{ background: "#070E1E" }}
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo & desc */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Anchor size={15} className="text-white" />
              </div>
              <span className="font-bold text-white text-lg">
                Easy <span className="text-blue-400">Logistics</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Транспортно-экспедиторская компания в Санкт-Петербурге. На рынке с 2004 года.
            </p>
          </div>

          {/* Nav */}
          <div>
            <div className="text-white font-medium mb-3">Навигация</div>
            <ul className="space-y-2 text-sm text-slate-400">
              {[
                ["#about", "О компании"],
                ["#services", "Услуги"],
                ["#advantages", "Преимущества"],
                ["#calculator", "Калькулятор"],
                ["#contacts", "Контакты"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="hover:text-blue-400 transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <div className="text-white font-medium mb-3">Контакты</div>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
                пр. Стачек 48/2, БЦ «Империал», СПб
              </li>
              <li>
                <a href="tel:+78122003281" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                  <Phone size={14} className="text-blue-400" />
                  +7 (812) 200-32-81
                </a>
              </li>
              <li>
                <a href="mailto:info@easylogistics.ru" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                  <Mail size={14} className="text-blue-400" />
                  info@easylogistics.ru
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/6 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-slate-600 text-xs">
          <span>© 2024 Easy Logistics. Все права защищены.</span>
          <span>ИНН 7810001990</span>
        </div>
      </div>
    </footer>
  );
}
