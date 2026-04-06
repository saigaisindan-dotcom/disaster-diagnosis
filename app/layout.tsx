import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "災害リスク診断 | 備蓄提案サービス",
  description: "あなたの住所・家族構成から、南海トラフ地震・津波・富士山噴火のリスクをシミュレーション。必要な備蓄量を算出します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body style={{ background: "#1e1e1e", color: "#e8e8e8" }} className="antialiased">
        {children}
      </body>
    </html>
  );
}
