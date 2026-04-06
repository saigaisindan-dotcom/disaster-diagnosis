export default function DesignsPage() {
  return (
    <div style={{ fontFamily: "sans-serif", background: "#111", minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <h1 style={{ color: "#fff", fontSize: 14, letterSpacing: "0.2em", marginBottom: 40, opacity: 0.5, fontFamily: "monospace" }}>
          DESIGN DIRECTION — 10 PATTERNS
        </h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: 32 }}>
          <Design01 />
          <Design02 />
          <Design03 />
          <Design04 />
          <Design05 />
          <Design06 />
          <Design07 />
          <Design08 />
          <Design09 />
          <Design10 />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   01. TERMINAL — CUIブラックグリーン
──────────────────────────────────────────*/
function Design01() {
  return (
    <Card label="01 — TERMINAL">
      <div style={{ background: "#0a0a0a", height: "100%", padding: 24, fontFamily: "'Courier New', monospace", color: "#00ff41", fontSize: 13 }}>
        <div style={{ opacity: 0.5, marginBottom: 16, fontSize: 11 }}>$ ./disaster-diagnosis --location=tokyo --family=3</div>
        <div style={{ color: "#fff", fontSize: 20, fontWeight: "bold", marginBottom: 4 }}>災害リスク診断</div>
        <div style={{ opacity: 0.6, marginBottom: 24, fontSize: 12 }}>DISASTER RISK ANALYSIS SYSTEM v2.1.0</div>

        <TerminalLine label="EARTHQUAKE" value={72} color="#00ff41" />
        <TerminalLine label="TSUNAMI   " value={34} color="#00cc33" />
        <TerminalLine label="VOLCANIC  " value={18} color="#009922" />

        <div style={{ marginTop: 20, borderTop: "1px solid #1a3a1a", paddingTop: 16 }}>
          <div style={{ opacity: 0.5, fontSize: 11, marginBottom: 8 }}>LIFELINE DISRUPTION</div>
          {["POWER: 5 days", "WATER: 9 days", "FOOD:  9 days"].map(t => (
            <div key={t} style={{ marginBottom: 4 }}>
              <span style={{ color: "#ffff00" }}>{">"} </span>{t}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ flex: 1, border: "1px solid #00ff41", padding: "8px 12px", fontSize: 12, opacity: 0.7 }}>
            ./run-diagnosis.sh
          </div>
          <div style={{ background: "#00ff41", color: "#000", padding: "8px 16px", fontSize: 12, fontWeight: "bold", cursor: "pointer" }}>
            EXEC
          </div>
        </div>

        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.015) 2px, rgba(0,255,65,0.015) 4px)", pointerEvents: "none" }} />
      </div>
    </Card>
  );
}

function TerminalLine({ label, value, color }: { label: string; value: number; color: string }) {
  const bar = Math.round(value / 5);
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3, fontSize: 12 }}>
        <span style={{ opacity: 0.7 }}>{label}</span>
        <span style={{ color }}>{value}/100</span>
      </div>
      <div style={{ background: "#111", height: 6, position: "relative" }}>
        <div style={{ width: `${value}%`, height: "100%", background: color, opacity: 0.8 }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   02. CYBER NEON — ダークネオン
──────────────────────────────────────────*/
function Design02() {
  return (
    <Card label="02 — CYBER NEON">
      <div style={{ background: "linear-gradient(135deg, #06001a 0%, #0a0020 100%)", height: "100%", padding: 24, position: "relative", overflow: "hidden" }}>
        {/* Decorative lines */}
        <div style={{ position: "absolute", top: 60, right: -20, width: 200, height: 1, background: "linear-gradient(90deg, transparent, #ff00ff44)", transform: "rotate(-20deg)" }} />
        <div style={{ position: "absolute", top: 80, right: -20, width: 160, height: 1, background: "linear-gradient(90deg, transparent, #00ffff33)", transform: "rotate(-20deg)" }} />

        <div style={{ color: "#ff00ff", fontSize: 11, letterSpacing: "0.3em", fontFamily: "monospace", marginBottom: 8 }}>
          ◈ HAZARD INTEL
        </div>
        <div style={{ color: "#fff", fontSize: 22, fontWeight: 900, marginBottom: 4, letterSpacing: "-0.02em" }}>
          災害リスク<br />
          <span style={{ color: "#00ffff" }}>診断システム</span>
        </div>

        <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {[
            { label: "地震", value: 72, color: "#ff3366" },
            { label: "津波", value: 34, color: "#00ffff" },
            { label: "火山", value: 18, color: "#ff9900" },
          ].map(item => (
            <div key={item.label} style={{ border: `1px solid ${item.color}44`, padding: "12px 8px", textAlign: "center", position: "relative" }}>
              <div style={{ color: item.color, fontSize: 24, fontWeight: 900, fontFamily: "monospace" }}>{item.value}</div>
              <div style={{ color: "#ffffff66", fontSize: 11, marginTop: 2 }}>{item.label}</div>
              <div style={{ position: "absolute", top: -1, left: "20%", right: "20%", height: 2, background: item.color, boxShadow: `0 0 8px ${item.color}` }} />
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20 }}>
          {["停電: 5日", "断水: 9日", "食料遅延: 9日"].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ width: 6, height: 6, background: "#00ffff", boxShadow: "0 0 6px #00ffff" }} />
              <span style={{ color: "#ffffffaa", fontSize: 13 }}>{item}</span>
            </div>
          ))}
        </div>

        <button style={{ marginTop: 16, width: "100%", background: "transparent", border: "1px solid #ff00ff", color: "#ff00ff", padding: "10px", fontSize: 13, letterSpacing: "0.2em", cursor: "pointer", boxShadow: "0 0 20px #ff00ff22", fontFamily: "monospace" }}>
          ▶ SCAN EXECUTE
        </button>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────
   03. DATA DASHBOARD — SaaSダッシュボード
──────────────────────────────────────────*/
function Design03() {
  return (
    <Card label="03 — DATA DASHBOARD">
      <div style={{ background: "#f8fafc", height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Sidebar */}
        <div style={{ display: "flex", flex: 1 }}>
          <div style={{ width: 56, background: "#1e293b", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 20, gap: 20 }}>
            {["⚡", "🗺", "📊", "⚙"].map((icon, i) => (
              <div key={i} style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, background: i === 0 ? "#3b82f6" : "transparent", fontSize: 14 }}>{icon}</div>
            ))}
          </div>
          <div style={{ flex: 1, padding: 20 }}>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4, letterSpacing: "0.05em" }}>DISASTER RISK PLATFORM</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>診断ダッシュボード</div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
              {[
                { label: "地震", value: "72", unit: "pt", color: "#ef4444" },
                { label: "津波", value: "34", unit: "pt", color: "#3b82f6" },
                { label: "火山灰", value: "18", unit: "pt", color: "#f59e0b" },
              ].map(item => (
                <div key={item.label} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ fontSize: 10, color: "#64748b", marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: item.color }}>{item.value}</div>
                  <div style={{ fontSize: 10, color: "#94a3b8" }}>{item.unit}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 12, marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>ライフライン途絶</div>
              {[{ label: "停電", days: 5, pct: 36 }, { label: "断水", days: 9, pct: 64 }, { label: "食料", days: 9, pct: 64 }].map(item => (
                <div key={item.label} style={{ marginBottom: 6 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 2 }}>
                    <span style={{ color: "#334155" }}>{item.label}</span>
                    <span style={{ color: "#3b82f6", fontWeight: 600 }}>{item.days}日</span>
                  </div>
                  <div style={{ height: 4, background: "#f1f5f9", borderRadius: 2 }}>
                    <div style={{ width: `${item.pct}%`, height: "100%", background: "#3b82f6", borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>

            <button style={{ width: "100%", background: "#3b82f6", color: "#fff", border: "none", borderRadius: 6, padding: "8px", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>
              診断を開始 →
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────
   04. GLASSMORPHISM — ガラス
──────────────────────────────────────────*/
function Design04() {
  return (
    <Card label="04 — GLASSMORPHISM">
      <div style={{ background: "linear-gradient(135deg, #1a0533 0%, #001233 50%, #003333 100%)", height: "100%", padding: 20, position: "relative", overflow: "hidden" }}>
        {/* Blobs */}
        <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, #8b5cf680 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 150, height: 150, borderRadius: "50%", background: "radial-gradient(circle, #06b6d480 0%, transparent 70%)" }} />

        <div style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 16, padding: 20, marginBottom: 12, position: "relative" }}>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, letterSpacing: "0.2em", marginBottom: 6 }}>DISASTER RISK</div>
          <div style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>災害リスク診断</div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 4 }}>南海トラフ・津波・富士山噴火</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
          {[{ label: "地震", val: 72, color: "#f87171" }, { label: "津波", val: 34, color: "#60a5fa" }, { label: "火山", val: 18, color: "#fbbf24" }].map(item => (
            <div key={item.label} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "12px 8px", textAlign: "center", backdropFilter: "blur(8px)" }}>
              <div style={{ color: item.color, fontSize: 22, fontWeight: 700 }}>{item.val}</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 2 }}>{item.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: 16, backdropFilter: "blur(8px)" }}>
          {[["停電", 5], ["断水", 9], ["食料遅延", 9]].map(([l, v]) => (
            <div key={l as string} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{l}</span>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>{v} 日</span>
            </div>
          ))}
          <button style={{ width: "100%", background: "rgba(139,92,246,0.6)", border: "1px solid rgba(139,92,246,0.8)", color: "#fff", borderRadius: 8, padding: "10px", fontSize: 13, cursor: "pointer", marginTop: 8, backdropFilter: "blur(4px)" }}>
            診断する
          </button>
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────
   05. MILITARY OPS — タクティカル
──────────────────────────────────────────*/
function Design05() {
  return (
    <Card label="05 — MILITARY OPS">
      <div style={{ background: "#1a1f0e", height: "100%", padding: 0, position: "relative", overflow: "hidden" }}>
        {/* Grid overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(120,150,80,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(120,150,80,0.08) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

        <div style={{ position: "relative", padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <div style={{ width: 28, height: 28, border: "2px solid #6b7a3a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⊕</div>
            <div>
              <div style={{ color: "#8b9a4a", fontSize: 10, letterSpacing: "0.3em", fontFamily: "monospace" }}>THREAT ASSESSMENT</div>
              <div style={{ color: "#c8d870", fontSize: 16, fontWeight: 700, fontFamily: "monospace" }}>災害リスク分析</div>
            </div>
          </div>

          <div style={{ border: "1px solid #3a4a1a", padding: 12, marginBottom: 12, background: "rgba(100,120,50,0.1)" }}>
            <div style={{ color: "#8b9a4a", fontSize: 10, letterSpacing: "0.2em", fontFamily: "monospace", marginBottom: 8 }}>▸ THREAT LEVELS</div>
            {[{ id: "EQ", label: "EARTHQUAKE", val: 72, alert: "HIGH" }, { id: "TS", label: "TSUNAMI", val: 34, alert: "MED" }, { id: "VO", label: "VOLCANIC", val: 18, alert: "LOW" }].map(item => (
              <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, fontFamily: "monospace" }}>
                <span style={{ color: "#6b7a3a", fontSize: 10, width: 20 }}>{item.id}</span>
                <div style={{ flex: 1, height: 6, background: "#0d1208" }}>
                  <div style={{ width: `${item.val}%`, height: "100%", background: item.val > 60 ? "#cc3300" : item.val > 30 ? "#cc8800" : "#446600" }} />
                </div>
                <span style={{ color: item.val > 60 ? "#ff4400" : item.val > 30 ? "#ffaa00" : "#88aa00", fontSize: 10, width: 28 }}>{item.alert}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
            {[["PWR OUTAGE", "5 DAYS"], ["H2O OUTAGE", "9 DAYS"], ["FOOD DELAY", "9 DAYS"], ["TOILET ETA", "9 DAYS"]].map(([l, v]) => (
              <div key={l} style={{ border: "1px solid #2a3a10", padding: "8px 10px", fontFamily: "monospace" }}>
                <div style={{ color: "#6b7a3a", fontSize: 9 }}>{l}</div>
                <div style={{ color: "#c8d870", fontSize: 14, fontWeight: 700 }}>{v}</div>
              </div>
            ))}
          </div>

          <button style={{ width: "100%", background: "#2a3a10", border: "1px solid #6b7a3a", color: "#c8d870", padding: "10px", fontSize: 12, cursor: "pointer", fontFamily: "monospace", letterSpacing: "0.15em" }}>
            ◉ INITIATE SCAN
          </button>
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────
   06. NEUMORPHISM — ソフトUI
──────────────────────────────────────────*/
function Design06() {
  return (
    <Card label="06 — NEUMORPHISM">
      <div style={{ background: "#e8ecf0", height: "100%", padding: 24 }}>
        <div style={{ boxShadow: "8px 8px 16px #c8cdd1, -8px -8px 16px #ffffff", borderRadius: 20, padding: 20, marginBottom: 16 }}>
          <div style={{ color: "#8899aa", fontSize: 11, letterSpacing: "0.15em", marginBottom: 4 }}>DISASTER RISK</div>
          <div style={{ color: "#2d3748", fontSize: 20, fontWeight: 700 }}>災害リスク診断</div>
          <div style={{ color: "#718096", fontSize: 12, marginTop: 4 }}>AIによるリスク分析システム</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
          {[{ label: "地震", val: 72, color: "#e53e3e" }, { label: "津波", val: 34, color: "#4299e1" }, { label: "火山", val: 18, color: "#ed8936" }].map(item => (
            <div key={item.label} style={{ boxShadow: "inset 4px 4px 8px #c8cdd1, inset -4px -4px 8px #ffffff", borderRadius: 12, padding: "14px 8px", textAlign: "center" }}>
              <div style={{ color: item.color, fontSize: 24, fontWeight: 800 }}>{item.val}</div>
              <div style={{ color: "#8899aa", fontSize: 11, marginTop: 2 }}>{item.label}</div>
            </div>
          ))}
        </div>

        <div style={{ boxShadow: "6px 6px 12px #c8cdd1, -6px -6px 12px #ffffff", borderRadius: 16, padding: 16, marginBottom: 16 }}>
          {[["停電", 5, 36], ["断水", 9, 64], ["食料遅延", 9, 64]].map(([l, v, p]) => (
            <div key={l as string} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#4a5568", marginBottom: 4 }}>
                <span>{l}</span><span style={{ fontWeight: 700 }}>{v}日</span>
              </div>
              <div style={{ boxShadow: "inset 3px 3px 6px #c8cdd1, inset -3px -3px 6px #ffffff", borderRadius: 10, height: 8 }}>
                <div style={{ width: `${p}%`, height: "100%", background: "linear-gradient(90deg, #667eea, #764ba2)", borderRadius: 10 }} />
              </div>
            </div>
          ))}
        </div>

        <button style={{ width: "100%", boxShadow: "6px 6px 12px #c8cdd1, -6px -6px 12px #ffffff", borderRadius: 12, padding: "12px", fontSize: 14, border: "none", background: "#e8ecf0", color: "#4a5568", cursor: "pointer", fontWeight: 600 }}>
          診断を開始 →
        </button>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────
   07. ENTERPRISE — コーポレートSaaS
──────────────────────────────────────────*/
function Design07() {
  return (
    <Card label="07 — ENTERPRISE SAAS">
      <div style={{ background: "#ffffff", height: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%)", padding: "20px 24px" }}>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, letterSpacing: "0.1em", marginBottom: 4 }}>災害対策プラットフォーム</div>
          <div style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>リスク診断ポータル</div>
          <div style={{ marginTop: 12, display: "flex", gap: 16 }}>
            {[["72", "地震リスク"], ["34", "津波リスク"], ["18", "火山リスク"]].map(([v, l]) => (
              <div key={l}>
                <div style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>{v}</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, padding: 20 }}>
          <div style={{ fontSize: 12, color: "#374151", fontWeight: 600, marginBottom: 12 }}>ライフライン途絶推計</div>
          {[{ label: "電力", days: 5, pct: 36, color: "#f59e0b" }, { label: "水道", days: 9, pct: 64, color: "#3b82f6" }, { label: "食料", days: 9, pct: 64, color: "#ef4444" }].map(item => (
            <div key={item.label} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                <span style={{ color: "#6b7280" }}>{item.label}</span>
                <span style={{ color: "#111827", fontWeight: 700 }}>{item.days}日</span>
              </div>
              <div style={{ height: 6, background: "#f3f4f6", borderRadius: 3 }}>
                <div style={{ width: `${item.pct}%`, height: "100%", background: item.color, borderRadius: 3 }} />
              </div>
            </div>
          ))}
          <div style={{ marginTop: 16, padding: 12, background: "#fef3c7", border: "1px solid #fde68a", borderRadius: 6 }}>
            <div style={{ fontSize: 12, color: "#92400e", fontWeight: 600 }}>⚠ 飲料水が117L不足</div>
            <div style={{ fontSize: 11, color: "#b45309", marginTop: 2 }}>早急な備蓄補充が必要です</div>
          </div>
          <button style={{ width: "100%", background: "#1e3a5f", color: "#fff", border: "none", borderRadius: 6, padding: "10px", fontSize: 13, cursor: "pointer", marginTop: 12, fontWeight: 600 }}>
            診断を開始する →
          </button>
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────
   08. RED ALERT — 赤アクセント緊急
──────────────────────────────────────────*/
function Design08() {
  return (
    <Card label="08 — RED ALERT">
      <div style={{ background: "#0a0a0a", height: "100%", padding: 24 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <div style={{ color: "#ff2233", fontSize: 10, letterSpacing: "0.3em", fontFamily: "monospace", marginBottom: 4 }}>
              ● ALERT ACTIVE
            </div>
            <div style={{ color: "#fff", fontSize: 22, fontWeight: 900, lineHeight: 1.2 }}>
              災害リスク<br />診断
            </div>
          </div>
          <div style={{ border: "2px solid #ff2233", padding: "6px 10px", textAlign: "center" }}>
            <div style={{ color: "#ff2233", fontSize: 18, fontWeight: 900 }}>72</div>
            <div style={{ color: "#ff2233", fontSize: 9, letterSpacing: "0.1em" }}>RISK</div>
          </div>
        </div>

        <div style={{ borderLeft: "3px solid #ff2233", paddingLeft: 12, marginBottom: 16 }}>
          {["地震リスク: 72pt", "津波リスク: 34pt", "火山灰リスク: 18pt"].map((item, i) => (
            <div key={i} style={{ color: i === 0 ? "#fff" : "#666", fontSize: 13, marginBottom: 4, fontFamily: "monospace" }}>{item}</div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, marginBottom: 16 }}>
          {[["停電", "5日"], ["断水", "9日"], ["食料遅延", "9日"], ["トイレ", "9日"]].map(([l, v]) => (
            <div key={l} style={{ background: "#111", padding: "10px 12px" }}>
              <div style={{ color: "#444", fontSize: 10, fontFamily: "monospace" }}>{l}</div>
              <div style={{ color: "#fff", fontSize: 16, fontWeight: 700, fontFamily: "monospace" }}>{v}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#ff223318", border: "1px solid #ff222244", padding: 10, marginBottom: 16 }}>
          <div style={{ color: "#ff2233", fontSize: 11, fontFamily: "monospace" }}>
            ⚠ 飲料水 -117L 不足 / 食料 -54食 不足
          </div>
        </div>

        <button style={{ width: "100%", background: "#ff2233", color: "#fff", border: "none", padding: "12px", fontSize: 14, cursor: "pointer", fontWeight: 900, letterSpacing: "0.1em", fontFamily: "monospace" }}>
          診断する
        </button>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────
   09. AURORA — AIプロダクト
──────────────────────────────────────────*/
function Design09() {
  return (
    <Card label="09 — AURORA AI">
      <div style={{ background: "#080b14", height: "100%", padding: 24, position: "relative", overflow: "hidden" }}>
        {/* Aurora bg */}
        <div style={{ position: "absolute", top: -100, left: -50, right: -50, height: 280, background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(79,209,197,0.15) 0%, rgba(99,102,241,0.1) 50%, transparent 100%)" }} />

        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(79,209,197,0.1)", border: "1px solid rgba(79,209,197,0.3)", borderRadius: 20, padding: "3px 10px", marginBottom: 12 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4fd1c5" }} />
            <span style={{ color: "#4fd1c5", fontSize: 11 }}>AI分析システム</span>
          </div>
          <div style={{ color: "#f0f4ff", fontSize: 22, fontWeight: 800, lineHeight: 1.3, marginBottom: 16 }}>
            災害リスクを<br />
            <span style={{ background: "linear-gradient(90deg, #4fd1c5, #6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AIで診断する</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
            {[{ label: "地震", val: 72, gradient: "from #f87171 to #ef4444" }, { label: "津波", val: 34, gradient: "from #60a5fa to #3b82f6" }, { label: "火山", val: 18, gradient: "from #fbbf24 to #f59e0b" }].map((item, i) => (
              <div key={item.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "12px 8px", textAlign: "center" }}>
                <div style={{ color: ["#f87171", "#60a5fa", "#fbbf24"][i], fontSize: 22, fontWeight: 800 }}>{item.val}</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 2 }}>{item.label}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 14, marginBottom: 14 }}>
            {[["⚡ 停電", "5日"], ["💧 断水", "9日"], ["🍚 食料遅延", "9日"]].map(([l, v]) => (
              <div key={l as string} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
                <span style={{ color: "rgba(255,255,255,0.5)" }}>{l}</span>
                <span style={{ color: "#f0f4ff", fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>

          <button style={{ width: "100%", background: "linear-gradient(135deg, #4fd1c5, #6366f1)", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontSize: 14, cursor: "pointer", fontWeight: 700 }}>
            診断を開始する →
          </button>
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────
   10. RETRO FUTURE — 80sシンセウェーブ
──────────────────────────────────────────*/
function Design10() {
  return (
    <Card label="10 — RETRO FUTURE">
      <div style={{ background: "#110022", height: "100%", padding: 24, position: "relative", overflow: "hidden" }}>
        {/* Grid floor */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, backgroundImage: "linear-gradient(rgba(255,0,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,255,0.3) 1px, transparent 1px)", backgroundSize: "30px 30px", backgroundPosition: "0 100%", maskImage: "linear-gradient(to bottom, transparent, black)" }} />

        <div style={{ position: "relative" }}>
          <div style={{ color: "#ff00ff", fontSize: 10, letterSpacing: "0.4em", fontFamily: "monospace", marginBottom: 4 }}>
            ◆◆◆ HAZARD SCAN ◆◆◆
          </div>
          <div style={{ fontSize: 24, fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>
            <span style={{ color: "#ff00ff", textShadow: "0 0 20px #ff00ff" }}>災害</span>
            <span style={{ color: "#fff" }}>リスク</span>
            <br />
            <span style={{ color: "#00ffff", textShadow: "0 0 20px #00ffff" }}>診断</span>
            <span style={{ color: "#fff" }}>システム</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 16 }}>
            {[{ label: "地震", val: 72, color: "#ff00ff" }, { label: "津波", val: 34, color: "#00ffff" }, { label: "火山", val: 18, color: "#ffff00" }].map(item => (
              <div key={item.label} style={{ border: `1px solid ${item.color}`, padding: "10px 6px", textAlign: "center", boxShadow: `0 0 10px ${item.color}44, inset 0 0 10px ${item.color}11` }}>
                <div style={{ color: item.color, fontSize: 20, fontWeight: 900, textShadow: `0 0 10px ${item.color}`, fontFamily: "monospace" }}>{item.val}</div>
                <div style={{ color: `${item.color}88`, fontSize: 10, fontFamily: "monospace" }}>{item.label}</div>
              </div>
            ))}
          </div>

          <div style={{ border: "1px solid #ff00ff44", padding: 12, marginBottom: 12 }}>
            {[["POWER", "5 DAYS", "#ff00ff"], ["WATER", "9 DAYS", "#00ffff"], ["FOOD", "9 DAYS", "#ffff00"]].map(([l, v, c]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontFamily: "monospace", fontSize: 12 }}>
                <span style={{ color: "#ffffff66" }}>{l}</span>
                <span style={{ color: c as string, textShadow: `0 0 8px ${c}` }}>{v}</span>
              </div>
            ))}
          </div>

          <button style={{ width: "100%", background: "transparent", border: "2px solid #ff00ff", color: "#ff00ff", padding: "10px", fontSize: 13, cursor: "pointer", fontFamily: "monospace", letterSpacing: "0.2em", boxShadow: "0 0 20px #ff00ff44, inset 0 0 20px #ff00ff11", textShadow: "0 0 10px #ff00ff" }}>
            ▶▶ EXECUTE ▶▶
          </button>
        </div>
      </div>
    </Card>
  );
}

/* ───────── Wrapper ───────── */
function Card({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ color: "#555", fontSize: 11, fontFamily: "monospace", letterSpacing: "0.15em", marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ height: 480, borderRadius: 4, overflow: "hidden", position: "relative", border: "1px solid #222" }}>
        {children}
      </div>
    </div>
  );
}
