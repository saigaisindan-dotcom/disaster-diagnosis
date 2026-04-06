import type { LifelineDisruption } from "@/lib/types";

const SH1 = "#111";
const SH2 = "#2b2b2b";

const ROWS = [
  { key: "powerDays" as keyof LifelineDisruption, icon: "⚡", label: "停電", pct: (v: number) => Math.min(100, v * 6) },
  { key: "waterDays" as keyof LifelineDisruption, icon: "💧", label: "断水", pct: (v: number) => Math.min(100, v * 5) },
  { key: "foodDelayDays" as keyof LifelineDisruption, icon: "🍚", label: "食料供給遅延", pct: (v: number) => Math.min(100, v * 5) },
  { key: "toiletIssueDays" as keyof LifelineDisruption, icon: "🚽", label: "トイレ問題", pct: (v: number) => Math.min(100, v * 5) },
];

interface Props {
  lifeline: LifelineDisruption;
}

export default function LifelinePanel({ lifeline }: Props) {
  return (
    <div style={{
      boxShadow: `5px 5px 14px ${SH1}, -4px -4px 10px ${SH2}`,
      borderRadius: 14,
      padding: "24px 22px",
    }}>
      <div style={{ color: "#888", fontSize: 10, letterSpacing: "0.2em", fontFamily: "monospace", marginBottom: 10 }}>
        LIFELINE DISRUPTION
      </div>
      <h3 style={{ color: "#e8e8e8", fontSize: 15, fontWeight: 700, margin: "0 0 22px", paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        ライフライン途絶推計
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {ROWS.map(({ key, icon, label, pct }, i) => {
          const days = lifeline[key];
          const pctVal = pct(days);
          return (
            <div key={key}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ color: "#bbb", fontSize: 12 }}>
                  <span style={{ marginRight: 6 }}>{icon}</span>{label}
                </span>
                <span style={{ color: "#ff1a2e", fontWeight: 900, fontSize: 18 }}>
                  {days}<span style={{ fontSize: 11, color: "#888", marginLeft: 2, fontWeight: 400 }}>日</span>
                </span>
              </div>
              <div style={{
                boxShadow: `inset 2px 2px 5px ${SH1}, inset -1px -1px 3px ${SH2}`,
                borderRadius: 5,
                height: 6,
                overflow: "hidden",
              }}>
                <div style={{
                  height: "100%",
                  width: `${pctVal}%`,
                  background: "linear-gradient(90deg, #4a0010, #aa1122, #ff1a2e)",
                  borderRadius: 5,
                  transformOrigin: "left center",
                  animation: `barFill 1.2s cubic-bezier(0.4,0,0.2,1) ${i * 120 + 200}ms both`,
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
