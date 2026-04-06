"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { DiagnosisResponse } from "@/lib/types";
import RiskScorePanel from "@/components/result/RiskScorePanel";
import LifelinePanel from "@/components/result/LifelinePanel";
import ShoppingSet from "@/components/result/ShoppingSet";
import ShareButtons from "@/components/result/ShareButtons";

const BG = "#1e1e1e";
const SH1 = "#111";
const SH2 = "#2b2b2b";

interface InputSummary {
  prefecture: string;
  city: string;
  familySize: number;
  housingType: "apartment" | "house";
  floorNumber: number;
  waterLiters: number;
  foodDays: number;
}

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<DiagnosisResponse | null>(null);
  const [input, setInput] = useState<InputSummary | null>(null);

  useEffect(() => {
    const r = sessionStorage.getItem("diagnosisResult");
    const i = sessionStorage.getItem("diagnosisInput");
    if (!r || !i) {
      router.replace("/");
      return;
    }
    try {
      setResult(JSON.parse(r));
      const inputData = JSON.parse(i);
      setInput({
        ...inputData,
        waterLiters: inputData.waterLiters ?? 0,
        foodDays: inputData.foodDays ?? 0,
      });
    } catch {
      router.replace("/");
    }
  }, [router]);

  if (!result || !input) {
    return (
      <div style={{ background: BG, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#444", fontSize: 13, fontFamily: "monospace" }}>LOADING...</div>
      </div>
    );
  }

  const housingLabel = input.housingType === "apartment"
    ? `マンション ${input.floorNumber}F`
    : "一戸建て";

  return (
    <div style={{ background: BG, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "20px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ color: "#888", fontSize: 10, letterSpacing: "0.25em", fontFamily: "monospace", marginBottom: 4 }}>
              DISASTER RISK ANALYSIS
            </div>
            <h1 style={{ color: "#e8e8e8", fontSize: 20, fontWeight: 900, margin: 0 }}>
              診断結果
            </h1>
            <div style={{ height: 2, width: 28, background: "#ff1a2e", marginTop: 8, boxShadow: "0 0 8px #ff1a2e88" }} />
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button
              onClick={() => router.push("/")}
              style={{
                boxShadow: `4px 4px 10px ${SH1}, -3px -3px 8px ${SH2}`,
                borderRadius: 10,
                border: "none",
                background: BG,
                color: "#bbb",
                fontSize: 13,
                fontWeight: 700,
                padding: "10px 18px",
                cursor: "pointer",
                letterSpacing: "0.03em",
              }}
            >
              ← 再診断する
            </button>
            <a
              href="/hazard"
              style={{
                color: "#000",
                fontSize: 12,
                fontWeight: 700,
                textDecoration: "none",
                letterSpacing: "0.05em",
                padding: "9px 16px",
                borderRadius: 8,
                background: "linear-gradient(135deg, #b8860b, #e6a800, #ffd000)",
                boxShadow: "0 3px 12px rgba(255,208,0,0.4)",
                whiteSpace: "nowrap",
              }}
            >
              災害を知る →
            </a>
          </div>
        </div>
      </header>

      <main style={{ flex: 1, maxWidth: 720, margin: "0 auto", width: "100%", padding: "36px 24px", display: "flex", flexDirection: "column", gap: 28 }}>
        {/* 入力サマリー */}
        <div style={{
          boxShadow: `inset 4px 4px 10px ${SH1}, inset -3px -3px 8px ${SH2}`,
          borderRadius: 12,
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
        }}>
          <span style={{ color: "#888", fontSize: 10, fontFamily: "monospace", letterSpacing: "0.2em", marginRight: 4 }}>INPUT —</span>
          <span style={{ color: "#e8e8e8", fontSize: 13, fontWeight: 700 }}>{input.prefecture}{input.city}</span>
          <span style={{ color: "#666" }}>／</span>
          <span style={{ color: "#ccc", fontSize: 13 }}>{input.familySize}人</span>
          <span style={{ color: "#666" }}>／</span>
          <span style={{ color: "#ccc", fontSize: 13 }}>{housingLabel}</span>
        </div>

        {/* リスクスコア + ライフライン — 2カラム */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          <RiskScorePanel risk={result.risk} />
          <LifelinePanel lifeline={result.lifeline} />
        </div>

        {/* 備蓄セット（メインコンテンツ） */}
        <ShoppingSet set={result.set} summaryMessage={result.summary.message} />

        {/* SNSシェア */}
        <ShareButtons
          risk={result.risk}
          summaryMessage={result.summary.message}
          prefecture={input.prefecture}
          city={input.city}
        />
      </main>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "20px 24px", textAlign: "center" }}>
        <p style={{ color: "#777", fontSize: 11, margin: 0 }}>
          本サービスはモックデータによる試算です。実際の防災対策は各自治体の情報を参照してください。
        </p>
      </footer>
    </div>
  );
}
