"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import type { DiagnosisRequest } from "@/lib/types";
import AddressInput from "./AddressInput";
import HouseholdInput from "./HouseholdInput";
import StockpileInput from "./StockpileInput";

const SH1 = "#111";
const SH2 = "#2b2b2b";
const RAISED = `5px 5px 14px ${SH1}, -4px -4px 10px ${SH2}`;

type FormValues = {
  prefecture: string;
  city: string;
  familySize: number;
  housingType: "apartment" | "house";
  floorNumber: number;
  waterLiters: number;
  foodDays: number;
};

export default function DiagnosisForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      prefecture: "",
      city: "",
      familySize: 2,
      housingType: "apartment",
      floorNumber: 1,
      waterLiters: 0,
      foodDays: 0,
    },
  });

  const housingType = watch("housingType");

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setError(null);

    const requestBody: DiagnosisRequest = {
      address: { prefecture: data.prefecture, city: data.city },
      household: {
        size: data.familySize,
        housingType: data.housingType,
        floorNumber: data.housingType === "apartment" ? data.floorNumber : undefined,
      },
      currentStockpile: {
        waterLiters: data.waterLiters,
        foodDays: data.foodDays,
      },
    };

    try {
      const res = await fetch("/api/diagnosis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) throw new Error("診断に失敗しました");

      const result = await res.json();
      sessionStorage.setItem("diagnosisResult", JSON.stringify(result));
      sessionStorage.setItem("diagnosisInput", JSON.stringify({
        prefecture: data.prefecture,
        city: data.city,
        familySize: data.familySize,
        housingType: data.housingType,
        floorNumber: data.floorNumber,
        waterLiters: data.waterLiters,
        foodDays: data.foodDays,
      }));
      router.push("/processing");
    } catch {
      setError("診断処理中にエラーが発生しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="diagnosis-form" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {/* セクション1 */}
      <div style={{ boxShadow: RAISED, borderRadius: 16, padding: "28px 24px" }}>
        <div style={{ color: "#888", fontSize: 10, letterSpacing: "0.2em", fontFamily: "monospace", marginBottom: 8 }}>
          01 — INPUT
        </div>
        <h2 style={{ color: "#e8e8e8", fontSize: 17, fontWeight: 700, margin: "0 0 24px", paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          あなたの情報
        </h2>
        <AddressInput register={register} errors={errors} />
        <div style={{ marginTop: 24 }}>
          <HouseholdInput
            register={register}
            watch={watch}
            setValue={setValue}
            errors={errors}
            housingType={housingType}
          />
        </div>
      </div>

      {/* セクション2 */}
      <div style={{ boxShadow: RAISED, borderRadius: 16, padding: "28px 24px" }}>
        <div style={{ color: "#888", fontSize: 10, letterSpacing: "0.2em", fontFamily: "monospace", marginBottom: 8 }}>
          02 — STOCKPILE
        </div>
        <h2 style={{ color: "#e8e8e8", fontSize: 17, fontWeight: 700, margin: "0 0 24px", paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          現在の備蓄
        </h2>
        <StockpileInput register={register} watch={watch} setValue={setValue} />
      </div>

      {/* エラー */}
      {error && (
        <div style={{ borderLeft: "3px solid #ff1a2e", background: "rgba(255,26,46,0.08)", padding: "12px 16px", borderRadius: 6 }}>
          <p style={{ color: "#ff6677", fontSize: 13, margin: 0 }}>{error}</p>
        </div>
      )}

      {/* 送信ボタン */}
      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "18px",
          background: loading
            ? "rgba(255,255,255,0.08)"
            : "linear-gradient(135deg, #7a0015, #cc1525, #ff1a2e)",
          color: loading ? "#555" : "#fff",
          fontWeight: 700,
          fontSize: 16,
          border: "none",
          borderRadius: 12,
          cursor: loading ? "not-allowed" : "pointer",
          letterSpacing: "0.05em",
          boxShadow: loading ? "none" : "0 4px 20px rgba(255,26,46,0.4)",
          transition: "opacity 0.2s",
        }}
      >
        {loading ? (
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <span style={{
              width: 18, height: 18,
              border: "2px solid #555",
              borderTopColor: "#888",
              borderRadius: "50%",
              display: "inline-block",
              animation: "spin 0.8s linear infinite",
            }} />
            診断中...
          </span>
        ) : "診断する →"}
      </button>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </form>
  );
}
