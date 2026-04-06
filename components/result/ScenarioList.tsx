const SH1 = "#111";
const SH2 = "#2b2b2b";

interface Props {
  scenarios: string[];
}

export default function ScenarioList({ scenarios }: Props) {
  return (
    <div style={{
      boxShadow: `5px 5px 14px ${SH1}, -4px -4px 10px ${SH2}`,
      borderRadius: 14,
      padding: "24px 22px",
    }}>
      <div style={{ color: "#888", fontSize: 10, letterSpacing: "0.2em", fontFamily: "monospace", marginBottom: 10 }}>
        SCENARIO
      </div>
      <h3 style={{ color: "#e8e8e8", fontSize: 15, fontWeight: 700, margin: "0 0 22px", paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        想定シナリオ
      </h3>
      <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
        {scenarios.map((text, i) => (
          <li key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <span style={{
              flexShrink: 0,
              width: 24, height: 24,
              border: "1px solid rgba(255,26,46,0.3)",
              color: "#ff1a2e",
              fontSize: 11,
              fontFamily: "monospace",
              fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 4,
            }}>
              {i + 1}
            </span>
            <span style={{ color: "#ccc", fontSize: 13, lineHeight: 1.7, paddingTop: 2 }}>{text}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
