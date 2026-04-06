import type { StockpileNeeds, StockpileShortage } from "@/lib/types";

const SH1 = "#111";
const SH2 = "#2b2b2b";

interface RowProps {
  label: string;
  needed: number;
  current: number;
  shortage: number;
  unit: string;
}

function GapRow({ label, needed, current, shortage, unit }: RowProps) {
  const ok = shortage === 0;
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      gap: 8,
      padding: "14px 0",
      borderBottom: "1px solid rgba(255,255,255,0.04)",
      alignItems: "center",
    }}>
      <div style={{ color: "#ccc", fontSize: 13, fontWeight: 500 }}>{label}</div>
      <div style={{ color: "#e8e8e8", fontSize: 13, textAlign: "right" }}>{needed}{unit}</div>
      <div style={{ color: "#999", fontSize: 13, textAlign: "right" }}>{current}{unit}</div>
      <div style={{ textAlign: "right" }}>
        {ok ? (
          <span style={{ color: "#4a9960", fontSize: 12, fontWeight: 700 }}>✓ 充足</span>
        ) : (
          <span style={{ color: "#ff1a2e", fontSize: 13, fontWeight: 900 }}>−{shortage}{unit}</span>
        )}
      </div>
    </div>
  );
}

interface Props {
  needs: StockpileNeeds;
  shortage: StockpileShortage;
  currentWaterLiters: number;
  currentFoodDays: number;
  familySize: number;
}

export default function StockpileGapPanel({ needs, shortage, currentWaterLiters, currentFoodDays, familySize }: Props) {
  const hasShortage = shortage.waterLiters > 0 || shortage.meals > 0;
  const currentMeals = familySize * 3 * currentFoodDays;

  return (
    <div style={{
      boxShadow: `5px 5px 14px ${SH1}, -4px -4px 10px ${SH2}`,
      borderRadius: 14,
      padding: "24px 22px",
    }}>
      <div style={{ color: "#888", fontSize: 10, letterSpacing: "0.2em", fontFamily: "monospace", marginBottom: 10 }}>
        STOCKPILE CHECK
      </div>
      <h3 style={{ color: "#e8e8e8", fontSize: 15, fontWeight: 700, margin: "0 0 22px", paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        備蓄不足チェック
      </h3>

      {/* テーブルヘッダー */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: 8,
        paddingBottom: 10,
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        marginBottom: 4,
      }}>
        {["品目", "必要量", "現在", "過不足"].map((h, i) => (
          <div key={h} style={{ color: "#777", fontSize: 11, fontWeight: 500, textAlign: i > 0 ? "right" : "left", letterSpacing: "0.05em" }}>
            {h}
          </div>
        ))}
      </div>

      <GapRow label="飲料水" needed={needs.waterLiters} current={currentWaterLiters} shortage={shortage.waterLiters} unit="L" />
      <GapRow label="食料" needed={needs.meals} current={currentMeals} shortage={shortage.meals} unit="食" />
      <GapRow label="携帯トイレ" needed={needs.toilets} current={0} shortage={needs.toilets} unit="回分" />
      <GapRow label="電池・電源" needed={needs.batteries} current={0} shortage={needs.batteries} unit="個" />

      {hasShortage && (
        <div style={{
          marginTop: 20,
          borderLeft: "3px solid #ff1a2e",
          background: "rgba(255,26,46,0.07)",
          padding: "14px 16px",
          borderRadius: "0 8px 8px 0",
        }}>
          <p style={{ color: "#ff6677", fontSize: 13, fontWeight: 700, margin: "0 0 8px" }}>⚠ 最優先で補充すべき備蓄</p>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
            {shortage.waterLiters > 0 && (
              <li style={{ color: "#ccc", fontSize: 12 }}>
                ・ 飲料水 あと <strong style={{ color: "#ff1a2e" }}>{shortage.waterLiters}L</strong> 追加が必要
              </li>
            )}
            {shortage.meals > 0 && (
              <li style={{ color: "#ccc", fontSize: 12 }}>
                ・ 食料 あと <strong style={{ color: "#ff1a2e" }}>{shortage.meals}食</strong> 追加が必要
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
