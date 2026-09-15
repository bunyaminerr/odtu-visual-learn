import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Görselleştirme Kütüphanelerinin CSS Dosyaları
import "katex/dist/katex.min.css";
import "mafs/core.css";
import "@xyflow/react/dist/style.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ODTÜ Visual Learn",
  description: "ODTÜ Dersleri için Görsel ve İnteraktif Eğitim Platformu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}