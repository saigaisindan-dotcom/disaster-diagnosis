import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://disaster-diagnosis.com";
const SITE_NAME = "災害リスク診断";
const TITLE = "災害リスク診断 | 南海トラフ・津波・噴火リスクを無料チェック";
const DESCRIPTION = "住所・家族構成を入力するだけで、南海トラフ地震・津波・富士山噴火のリスクをAIがシミュレーション。あなたの家庭に必要な備蓄量と防災グッズを無料で診断します。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: {
    google: "UsrTi8o_zeKxQDrVr6evX9CFvziZisAfpIZJLct-tiA",
  },
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    "災害リスク診断", "防災診断", "南海トラフ地震", "津波リスク", "富士山噴火",
    "備蓄チェック", "防災グッズ", "備蓄量", "地震対策", "防災シミュレーション",
    "無料診断", "ハザードマップ", "家庭防災", "備蓄リスト",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@disaster_diag",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: SITE_URL,
  description: DESCRIPTION,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "JPY",
  },
  inLanguage: "ja",
  about: {
    "@type": "Thing",
    name: "防災・災害対策",
    description: "地震・津波・火山噴火などの自然災害に対する備え",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-JM0QC6H4RF" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-JM0QC6H4RF');
            `,
          }}
        />
      </head>
      <body style={{ background: "#1e1e1e", color: "#e8e8e8" }} className="antialiased">
        {children}
      </body>
    </html>
  );
}
