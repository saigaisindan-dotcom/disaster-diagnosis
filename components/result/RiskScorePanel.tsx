import type { RiskScores } from "@/lib/types";

const SH1 = "#111";
const SH2 = "#2b2b2b";

const SCORE_COLORS = [
  { label: "地震リスク", key: "earthquake" as keyof RiskScores, color: "#ff1a2e" },
  { label: "津波リスク", key: "tsunami" as keyof RiskScores, color: "#cc1525" },
  { label: "火山灰リスク", key: "ash" as keyof RiskScores, color: "#991020" },
];

function ScoreBar({ label, score, color, delay }: { label: string; score: number; color: string; delay: number }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
        <span style={{ color: "#bbb", fontSize: 12, fontWeight: 500 }}>{label}</span>
        <span style={{ color, fontSize: 22, fontWeight: 900, lineHeight: 1 }}>
          {score}<span style={{ fontSize: 10, color: "#777", marginLeft: 2, fontWeight: 400 }}>/100</span>
        </span>
      </div>
      <div style={{
        boxShadow: `inset 2px 2px 5px ${SH1}, inset -1px -1px 3px ${SH2}`,
        borderRadius: 6,
        height: 8,
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: `${score}%`,
          background: `linear-gradient(90deg, #4a0010, #aa1122, ${color})`,
          borderRadius: 6,
          transformOrigin: "left center",
          animation: `barFill 1.2s cubic-bezier(0.4,0,0.2,1) ${delay}ms both`,
        }} />
      </div>
    </div>
  );
}

interface Props {
  risk: RiskScores;
}

export default function RiskScorePanel({ risk }: Props) {
  return (
    <div style={{
      boxShadow: `5px 5px 14px ${SH1}, -4px -4px 10px ${SH2}`,
      borderRadius: 14,
      padding: "24px 22px",
    }}>
      <div style={{ color: "#888", fontSize: 10, letterSpacing: "0.2em", fontFamily: "monospace", marginBottom: 10 }}>
        RISK SCORE
      </div>
      <h3 style={{ color: "#e8e8e8", fontSize: 15, fontWeight: 700, margin: "0 0 22px", paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        リスクスコア
      </h3>
      {SCORE_COLORS.map(({ label, key, color }, i) => (
        <ScoreBar key={key} label={label} score={risk[key]} color={color} delay={i * 150} />
      ))}
    </div>
  );
}
