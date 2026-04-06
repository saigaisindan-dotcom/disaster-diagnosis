import DiagnosisForm from "@/components/form/DiagnosisForm";

const BG = "#1e1e1e";
const SH1 = "#111";
const SH2 = "#2b2b2b";
const RAISED = `5px 5px 14px ${SH1}, -4px -4px 10px ${SH2}`;

export default function HomePage() {
  return (
    <div style={{ background: BG, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "20px 24px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ color: "#888", fontSize: 10, letterSpacing: "0.25em", fontFamily: "monospace", marginBottom: 4 }}>
            DISASTER RISK ANALYSIS
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h1 style={{ color: "#e8e8e8", fontSize: 20, fontWeight: 900, margin: 0 }}>
                災害リスク診断
              </h1>
              <span style={{ color: "#888", fontSize: 12 }}>&amp; 備蓄提案サービス</span>
            </div>
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
          <div style={{ height: 2, width: 36, background: "#ff1a2e", marginTop: 8, boxShadow: "0 0 8px #ff1a2e88" }} />
        </div>
      </header>

      <main style={{ flex: 1, maxWidth: 680, margin: "0 auto", width: "100%", padding: "40px 24px", display: "flex", flexDirection: "column", gap: 36 }}>
        {/* Hero */}
        <section style={{ boxShadow: RAISED, borderRadius: 16, padding: "32px 28px" }}>
          <div style={{ color: "#888", fontSize: 10, letterSpacing: "0.25em", fontFamily: "monospace", marginBottom: 16 }}>
            ● RISK SIMULATOR ACTIVE
          </div>
          <h2 style={{ color: "#e8e8e8", fontSize: 26, fontWeight: 900, lineHeight: 1.4, margin: "0 0 16px" }}>
            あなたの地域の<br />
            災害リスクを診断する
          </h2>
          <p style={{ color: "#bbb", fontSize: 14, lineHeight: 1.8, margin: "0 0 28px" }}>
            住所・家族構成・現在の備蓄を入力すると、
            <span style={{ color: "#e8e8e8", fontWeight: 700 }}>南海トラフ地震・津波・富士山噴火</span>による
            生活への影響と必要な備蓄量を算出します。
          </p>
          <div style={{ display: "flex", gap: 28, marginBottom: 32, paddingBottom: 28, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {[
              { num: "3", label: "災害種別" },
              { num: "4", label: "ライフライン指標" },
              { num: "～1秒", label: "診断時間" },
            ].map(({ num, label }) => (
              <div key={label}>
                <div style={{ color: "#ff1a2e", fontSize: 22, fontWeight: 900, lineHeight: 1 }}>{num}</div>
                <div style={{ color: "#888", fontSize: 11, marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
          <a
            href="#diagnosis-form"
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #7a0015, #cc1525, #ff1a2e)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              padding: "14px 28px",
              borderRadius: 10,
              textDecoration: "none",
              letterSpacing: "0.05em",
              boxShadow: "0 4px 16px rgba(255,26,46,0.35)",
            }}
          >
            診断を始める →
          </a>
        </section>

        {/* Form */}
        <DiagnosisForm />
      </main>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "20px 24px", textAlign: "center" }}>
        <p style={{ color: "#777", fontSize: 11, margin: 0 }}>
          本サービスはモックデータによる試算です。実際の防災対策は各自治体の情報を参照してください。
        </p>
      </footer>
    </div>
  );
}
