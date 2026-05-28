import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Easy Logistics — Транспортно-экспедиторские услуги",
  description:
    "«Изи Лоджистикс» — профессиональная транспортно-экспедиторская компания в Санкт-Петербурге. Международные перевозки морем, воздухом и авто с 2004 года. Более 20 000 выполненных заказов.",
  keywords:
    "логистика, транспортировка, экспедирование, контейнеры, грузоперевозки, Санкт-Петербург, таможенное оформление",
  openGraph: {
    title: "Easy Logistics — Транспортно-экспедиторские услуги",
    description: "Международные грузоперевозки из Санкт-Петербурга с 2004 года",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
