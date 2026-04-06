/* ============================================================
   DESIGNS2 — 08 (RED ALERT 漆黒×赤) × 06 (NEUMORPHISM 凹凸) 混合
   10 patterns, each a different interpretation of this blend
   ============================================================ */
export default function Designs2Page() {
  return (
    <div style={{ fontFamily: "sans-serif", background: "#0d0d0d", minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <p style={{ color: "#444", fontSize: 11, letterSpacing: "0.2em", marginBottom: 6, fontFamily: "monospace" }}>
          DESIGN DIRECTION — ROUND 2
        </p>
        <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 900, marginBottom: 8 }}>
          08 × 06 <span style={{ color: "#cc2233" }}>RED</span> × <span style={{ color: "#888" }}>SOFT</span>
        </h1>
        <p style={{ color: "#444", fontSize: 12, marginBottom: 48 }}>漆黒×赤アクセント + ニューモーフィズム凹凸 の掛け合わせ 10パターン</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: 36 }}>
          <D01 /><D02 /><D03 /><D04 /><D05 />
          <D06 /><D07 /><D08 /><D09 /><D10 />
        </div>
      </div>
    </div>
  );
}

/* ─── shared wrapper ─── */
function Card({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ color: "#444", fontSize: 11, fontFamily: "monospace", letterSpacing: "0.15em", marginBottom: 8 }}>{label}</div>
      <div style={{ height: 500, borderRadius: 4, overflow: "hidden", position: "relative", border: "1px solid #1a1a1a" }}>
        {children}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   01. DARK SCULPT — 濃グレーニューモ + 赤ライン
   濃いチャコール地に凹凸。赤はラインのみ細く
──────────────────────────────────────────*/
function D01() {
  const bg = "#1a1a1a";
  const sh1 = "#0d0d0d", sh2 = "#272727";
  return (
    <Card label="01 — DARK SCULPT">
      <div style={{ background: bg, height: "100%", padding: 28 }}>
        {/* Header raised */}
        <div style={{ boxShadow: `4px 4px 10px ${sh1}, -4px -4px 10px ${sh2}`, borderRadius: 14, padding: 20, marginBottom: 20 }}>
          <div style={{ borderLeft: "3px solid #cc2233", paddingLeft: 12 }}>
            <div style={{ color: "#555", fontSize: 10, letterSpacing: "0.2em", marginBottom: 4 }}>DISASTER RISK SYSTEM</div>
            <div style={{ color: "#e0e0e0", fontSize: 22, fontWeight: 800 }}>災害リスク診断</div>
          </div>
        </div>

        {/* Score inset pills */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
          {[{ l: "地震", v: 72, c: "#cc2233" }, { l: "津波", v: 34, c: "#884444" }, { l: "火山", v: 18, c: "#553333" }].map(item => (
            <div key={item.l} style={{ boxShadow: `inset 3px 3px 7px ${sh1}, inset -3px -3px 7px ${sh2}`, borderRadius: 10, padding: "14px 8px", textAlign: "center" }}>
              <div style={{ color: item.c, fontSize: 26, fontWeight: 900 }}>{item.v}</div>
              <div style={{ color: "#444", fontSize: 10, marginTop: 2 }}>{item.l}</div>
            </div>
          ))}
        </div>

        {/* Lifeline raised card */}
        <div style={{ boxShadow: `4px 4px 10px ${sh1}, -4px -4px 10px ${sh2}`, borderRadius: 12, padding: 16, marginBottom: 20 }}>
          {[["停電", 5, 36], ["断水", 9, 64], ["食料遅延", 9, 64]].map(([l, v, p]) => (
            <div key={l as string} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
                <span style={{ color: "#666" }}>{l}</span>
                <span style={{ color: "#cc2233", fontWeight: 700 }}>{v}日</span>
              </div>
              <div style={{ boxShadow: `inset 2px 2px 5px ${sh1}, inset -2px -2px 5px ${sh2}`, borderRadius: 6, height: 6 }}>
                <div style={{ width: `${p}%`, height: "100%", background: "#cc2233", borderRadius: 6, opacity: 0.8 }} />
              </div>
            </div>
          ))}
        </div>

        <button style={{ width: "100%", boxShadow: `4px 4px 10px ${sh1}, -4px -4px 10px ${sh2}`, borderRadius: 10, padding: "13px", fontSize: 14, border: "none", background: bg, color: "#cc2233", cursor: "pointer", fontWeight: 700, letterSpacing: "0.05em" }}>
          診断する →
        </button>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────
   02. CARBON RED — カーボン質感 + 赤LED
   ほぼ黒。浮き出た要素に赤いエッジ光
──────────────────────────────────────────*/
function D02() {
  const bg = "#141414";
  return (
    <Card label="02 — CARBON RED">
      <div style={{ background: bg, height: "100%", padding: 28, position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.008) 0px, rgba(255,255,255,0.008) 1px, transparent 1px, transparent 8px)", pointerEvents: "none" }} />

        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#cc2233", boxShadow: "0 0 8px #cc2233, 0 0 16px #cc223344" }} />
            <div style={{ color: "#333", fontSize: 11, letterSpacing: "0.2em" }}>SYSTEM ONLINE</div>
          </div>

          <div style={{ boxShadow: "6px 6px 14px #080808, -4px -4px 10px #222", borderRadius: 16, padding: 20, marginBottom: 16, borderTop: "1px solid #2a2a2a", borderLeft: "1px solid #222" }}>
            <div style={{ color: "#aaa", fontSize: 11, marginBottom: 4 }}>DISASTER RISK</div>
            <div style={{ color: "#fff", fontSize: 22, fontWeight: 900, marginBottom: 6 }}>災害リスク診断</div>
            <div style={{ display: "flex", gap: 16 }}>
              {[["72", "#cc2233"], ["34", "#882233"], ["18", "#551122"]].map(([v, c], i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ color: c as string, fontSize: 20, fontWeight: 900 }}>{v}</div>
                  <div style={{ color: "#333", fontSize: 10 }}>{["地震", "津波", "火山"][i]}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
            {[["停電", "5日"], ["断水", "9日"], ["食料遅延", "9日"], ["トイレ", "9日"]].map(([l, v]) => (
              <div key={l} style={{ boxShadow: "inset 3px 3px 7px #080808, inset -3px -3px 7px #222", borderRadius: 8, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#555", fontSize: 11 }}>{l}</span>
                <span style={{ color: "#cc2233", fontWeight: 700, fontSize: 15 }}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{ boxShadow: "inset 3px 3px 8px #080808, inset -2px -2px 6px #1e1e1e", borderRadius: 10, padding: "10px 14px", marginBottom: 16, borderLeft: "3px solid #cc2233" }}>
            <div style={{ color: "#cc2233", fontSize: 12, fontWeight: 700 }}>⚠ 飲料水 117L 不足</div>
            <div style={{ color: "#553333", fontSize: 11, marginTop: 2 }}>食料 54食 不足</div>
          </div>

          <button style={{ width: "100%", boxShadow: "4px 4px 10px #080808, -3px -3px 8px #222", borderRadius: 10, padding: "12px", background: "#1a0508", border: "1px solid #cc223344", color: "#cc2233", fontSize: 14, cursor: "pointer", fontWeight: 700 }}>
            診断する →
          </button>
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────
   03. DEEP VOID — 極限まで黒く + 赤浮彫り
   黒から黒へのグラデーション。赤は面で使う
──────────────────────────────────────────*/
function D03() {
  return (
    <Card label="03 — DEEP VOID">
      <div style={{ background: "#0f0f0f", height: "100%", padding: 28 }}>
        {/* Raised header with red top border */}
        <div style={{ boxShadow: "6px 6px 16px #050505, -4px -4px 12px #1a1a1a", borderRadius: 16, padding: 20, marginBottom: 18, borderTop: "2px solid #cc2233" }}>
          <div style={{ color: "#777", fontSize: 10, letterSpacing: "0.25em", marginBottom: 6 }}>● RISK ANALYSIS</div>
          <div style={{ color: "#f0f0f0", fontSize: 24, fontWeight: 900, lineHeight: 1.1 }}>
            災害リスク<br /><span style={{ color: "#cc2233" }}>診断</span>
          </div>
        </div>

        {/* Risk — red fill blocks */}
        <div style={{ boxShadow: "inset 4px 4px 10px #050505, inset -3px -3px 8px #1a1a1a", borderRadius: 12, padding: 16, marginBottom: 18 }}>
          <div style={{ color: "#555", fontSize: 10, letterSpacing: "0.2em", marginBottom: 10 }}>RISK SCORES</div>
          {[{ l: "地震リスク", v: 72 }, { l: "津波リスク", v: 34 }, { l: "火山灰", v: 18 }].map(item => (
            <div key={item.l} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#666", fontSize: 12, marginBottom: 4 }}>
                <span>{item.l}</span><span style={{ color: "#cc2233", fontWeight: 700 }}>{item.v}</span>
              </div>
              <div style={{ boxShadow: "inset 2px 2px 4px #050505, inset -2px -2px 4px #1a1a1a", borderRadius: 4, height: 7 }}>
                <div style={{ width: `${item.v}%`, height: "100%", background: `linear-gradient(90deg, #aa1122, #cc2233)`, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>

        {/* 3-col days */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 18 }}>
          {[["停電", "5"], ["断水", "9"], ["食料", "9"]].map(([l, v]) => (
            <div key={l} style={{ boxShadow: "5px 5px 12px #050505, -3px -3px 8px #1a1a1a", borderRadius: 10, padding: "16px 8px", textAlign: "center" }}>
              <div style={{ color: "#cc2233", fontSize: 28, fontWeight: 900 }}>{v}</div>
              <div style={{ color: "#333", fontSize: 10, marginTop: 2 }}>{l}（日）</div>
            </div>
          ))}
        </div>

        <button style={{ width: "100%", boxShadow: "5px 5px 12px #050505, -3px -3px 8px #1a1a1a", borderRadius: 12, padding: "13px", background: "#0f0f0f", border: "none", color: "#e0e0e0", fontSize: 14, cursor: "pointer", fontWeight: 700 }}>
          診断する →
        </button>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────
   04. IRON PLATE — スチール板 + 赤刻印
   金属的なダークグレー。赤は刻印・スタンプ感
──────────────────────────────────────────*/
function D04() {
  const bg = "#1c1c1c";
  const sh1 = "#0e0e0e", sh2 = "#2a2a2a";
  return (
    <Card label="04 — IRON PLATE">
      <div style={{ background: bg, height: "100%", padding: 28 }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "inline-block", border: "2px solid #cc2233", padding: "3px 10px", marginBottom: 10 }}>
            <span style={{ color: "#cc2233", fontSize: 10, letterSpacing: "0.3em", fontFamily: "monospace" }}>HAZARD CLASS A</span>
          </div>
          <div style={{ color: "#d0d0d0", fontSize: 24, fontWeight: 900 }}>災害リスク診断</div>
          <div style={{ color: "#555", fontSize: 12, marginTop: 4 }}>南海トラフ / 津波 / 富士山噴火</div>
        </div>

        {/* Inset score plate */}
        <div style={{ boxShadow: `inset 5px 5px 12px ${sh1}, inset -4px -4px 10px ${sh2}`, borderRadius: 4, padding: "16px 20px", marginBottom: 18, background: bg }}>
          {[{ l: "地震", v: 72 }, { l: "津波", v: 34 }, { l: "火山灰", v: 18 }].map(item => (
            <div key={item.l} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 32, color: "#555", fontSize: 11, fontFamily: "monospace" }}>{item.l}</div>
              <div style={{ flex: 1, boxShadow: `inset 2px 2px 4px ${sh1}`, height: 8, borderRadius: 2 }}>
                <div style={{ width: `${item.v}%`, height: "100%", background: "#cc2233" }} />
              </div>
              <div style={{ width: 28, color: "#cc2233", fontSize: 13, fontWeight: 700, textAlign: "right" }}>{item.v}</div>
            </div>
          ))}
        </div>

        {/* Raised day blocks */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginBottom: 18 }}>
          {[["停電", "5日"], ["断水", "9日"], ["食料", "9日"], ["トイレ", "9日"]].map(([l, v]) => (
            <div key={l} style={{ boxShadow: `3px 3px 7px ${sh1}, -2px -2px 5px ${sh2}`, borderRadius: 4, padding: "10px 4px", textAlign: "center" }}>
              <div style={{ color: "#cc2233", fontSize: 15, fontWeight: 900 }}>{v}</div>
              <div style={{ color: "#444", fontSize: 9, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Alert stamp */}
        <div style={{ boxShadow: `inset 3px 3px 6px ${sh1}, inset -2px -2px 5px ${sh2}`, borderRadius: 4, padding: 12, marginBottom: 16, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -8, right: -8, fontSize: 64, color: "#cc222308", fontWeight: 900, transform: "rotate(-15deg)", pointerEvents: "none" }}>!</div>
          <div style={{ color: "#cc2233", fontSize: 13, fontWeight: 700 }}>飲料水 117L 不足</div>
          <div style={{ color: "#663333", fontSize: 11, marginTop: 2 }}>食料 54食 不足 / 早急な補充が必要</div>
        </div>

        <button style={{ width: "100%", boxShadow: `4px 4px 8px ${sh1}, -3px -3px 7px ${sh2}`, borderRadius: 4, padding: "12px", background: "#cc2233", border: "none", color: "#fff", fontSize: 14, cursor: "pointer", fontWeight: 900, letterSpacing: "0.05em" }}>
          診断する →
        </button>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────
   05. OBSIDIAN — 黒曜石テクスチャ + 暗赤色
   漆黒のニューモ。赤は暗く深みを持たせる
──────────────────────────────────────────*/
function D05() {
  const bg = "#111318";
  const sh1 = "#070810", sh2 = "#1a1d24";
  return (
    <Card label="05 — OBSIDIAN">
      <div style={{ background: bg, height: "100%", padding: 28 }}>
        <div style={{ boxShadow: `6px 6px 16px ${sh1}, -4px -4px 10px ${sh2}`, borderRadius: 18, padding: 22, marginBottom: 18 }}>
          <div style={{ color: "#9b1c2e", fontSize: 10, letterSpacing: "0.25em", marginBottom: 6, fontFamily: "monospace" }}>◈ DISASTER RISK</div>
          <div style={{ color: "#c8cdd6", fontSize: 22, fontWeight: 800 }}>災害リスク診断</div>
          <div style={{ color: "#3a3d44", fontSize: 12, marginTop: 4 }}>南海トラフ地震・津波・富士山噴火</div>
          <div style={{ display: "flex", gap: 20, marginTop: 14 }}>
            {[{ l: "地震", v: 72 }, { l: "津波", v: 34 }, { l: "火山", v: 18 }].map(item => (
              <div key={item.l}>
                <div style={{ color: "#9b1c2e", fontSize: 22, fontWeight: 900 }}>{item.v}</div>
                <div style={{ color: "#444", fontSize: 10 }}>{item.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ boxShadow: `inset 5px 5px 12px ${sh1}, inset -4px -4px 10px ${sh2}`, borderRadius: 14, padding: 18, marginBottom: 18 }}>
          <div style={{ color: "#444", fontSize: 10, letterSpacing: "0.2em", marginBottom: 12 }}>ライフライン途絶推計</div>
          {[["停電", 5, 36], ["断水", 9, 64], ["食料遅延", 9, 64]].map(([l, v, p]) => (
            <div key={l as string} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                <span style={{ color: "#666" }}>{l}</span>
                <span style={{ color: "#9b1c2e", fontWeight: 700 }}>{v}日</span>
              </div>
              <div style={{ boxShadow: `inset 2px 2px 5px ${sh1}, inset -2px -2px 5px ${sh2}`, borderRadius: 6, height: 7 }}>
                <div style={{ width: `${p}%`, height: "100%", background: "linear-gradient(90deg, #6b0a16, #9b1c2e)", borderRadius: 6 }} />
              </div>
            </div>
          ))}
        </div>

        <button style={{ width: "100%", boxShadow: `5px 5px 12px ${sh1}, -4px -4px 10px ${sh2}`, borderRadius: 12, padding: "13px", background: bg, border: "none", color: "#9b1c2e", fontSize: 14, cursor: "pointer", fontWeight: 800 }}>
          診断する →
        </button>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────
   06. ANTHRACITE — アンスラサイト + 鮮赤
   温かみゼロの石炭灰色。赤だけが鮮明
──────────────────────────────────────────*/
function D06() {
  const bg = "#1e1e1e";
  const sh1 = "#111", sh2 = "#2b2b2b";
  return (
    <Card label="06 — ANTHRACITE">
      <div style={{ background: bg, height: "100%", padding: 28 }}>
        {/* Title with red underline effect */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ color: "#666", fontSize: 10, letterSpacing: "0.25em", marginBottom: 6 }}>DISASTER RISK ANALYSIS</div>
          <div style={{ color: "#e8e8e8", fontSize: 24, fontWeight: 900 }}>災害リスク診断</div>
          <div style={{ height: 2, width: 40, background: "#ff1a2e", marginTop: 8, boxShadow: "0 0 8px #ff1a2e88" }} />
        </div>

        {/* Score — raised individual */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
          {[{ l: "地震", v: 72, c: "#ff1a2e" }, { l: "津波", v: 34, c: "#cc1525" }, { l: "火山", v: 18, c: "#991020" }].map(item => (
            <div key={item.l} style={{ boxShadow: `5px 5px 12px ${sh1}, -4px -4px 10px ${sh2}`, borderRadius: 12, padding: "16px 8px", textAlign: "center" }}>
              <div style={{ color: item.c, fontSize: 28, fontWeight: 900 }}>{item.v}</div>
              <div style={{ color: "#444", fontSize: 10, marginTop: 3 }}>{item.l}</div>
            </div>
          ))}
        </div>

        {/* Lifeline inset */}
        <div style={{ boxShadow: `inset 5px 5px 12px ${sh1}, inset -4px -4px 10px ${sh2}`, borderRadius: 12, padding: 18, marginBottom: 20 }}>
          {[["停電", 5, 36], ["断水", 9, 64], ["食料遅延", 9, 64], ["トイレ問題", 9, 64]].map(([l, v, p]) => (
            <div key={l as string} style={{ marginBottom: 9 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                <span style={{ color: "#888" }}>{l}</span>
                <span style={{ color: "#ff1a2e", fontWeight: 700 }}>{v}日</span>
              </div>
              <div style={{ boxShadow: `inset 2px 2px 4px ${sh1}`, borderRadius: 4, height: 5 }}>
                <div style={{ width: `${p}%`, height: "100%", background: "linear-gradient(90deg, #4a0010, #aa1122, #ff1a2e)" }} />
              </div>
            </div>
          ))}
        </div>

        <button style={{ width: "100%", boxShadow: `5px 5px 12px ${sh1}, -4px -4px 10px ${sh2}`, borderRadius: 10, padding: "13px", background: bg, border: "none", color: "#e0e0e0", fontSize: 14, cursor: "pointer", fontWeight: 700 }}>
          診断する →
        </button>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────
   07. SLATE EMBER — 青みがかった黒 + オレンジ赤
   スレートグレーの凹凸。赤をやや橙よりに
──────────────────────────────────────────*/
function D07() {
  const bg = "#16191f";
  const sh1 = "#0c0e12", sh2 = "#202530";
  return (
    <Card label="07 — SLATE EMBER">
      <div style={{ background: bg, height: "100%", padding: 28 }}>
        <div style={{ boxShadow: `6px 6px 14px ${sh1}, -4px -4px 10px ${sh2}`, borderRadius: 16, padding: 20, marginBottom: 18 }}>
          <div style={{ color: "#e84020", fontSize: 10, letterSpacing: "0.3em", fontFamily: "monospace", marginBottom: 6 }}>● ALERT ACTIVE</div>
          <div style={{ color: "#dde2ea", fontSize: 22, fontWeight: 800 }}>災害リスク診断</div>
          <div style={{ color: "#3d4455", fontSize: 11, marginTop: 4 }}>南海トラフ / 津波 / 富士山噴火</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 18 }}>
          {[{ l: "地震", v: 72 }, { l: "津波", v: 34 }, { l: "火山", v: 18 }].map(item => (
            <div key={item.l} style={{ boxShadow: `inset 4px 4px 9px ${sh1}, inset -3px -3px 7px ${sh2}`, borderRadius: 10, padding: "14px 6px", textAlign: "center" }}>
              <div style={{ color: "#e84020", fontSize: 26, fontWeight: 900 }}>{item.v}</div>
              <div style={{ color: "#3d4455", fontSize: 10, marginTop: 3 }}>{item.l}</div>
            </div>
          ))}
        </div>

        <div style={{ boxShadow: `5px 5px 12px ${sh1}, -4px -4px 10px ${sh2}`, borderRadius: 12, padding: 16, marginBottom: 16 }}>
          {[["停電", 5, 36], ["断水", 9, 64], ["食料遅延", 9, 64]].map(([l, v, p]) => (
            <div key={l as string} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                <span style={{ color: "#5a6273" }}>{l}</span>
                <span style={{ color: "#e84020", fontWeight: 700 }}>{v}日</span>
              </div>
              <div style={{ boxShadow: `inset 2px 2px 4px ${sh1}`, borderRadius: 5, height: 6 }}>
                <div style={{ width: `${p}%`, height: "100%", background: "linear-gradient(90deg, #b83010, #e84020)", borderRadius: 5 }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ boxShadow: `inset 3px 3px 7px ${sh1}, inset -2px -2px 5px ${sh2}`, borderRadius: 8, padding: "10px 14px", marginBottom: 16, borderLeft: "3px solid #e84020" }}>
          <div style={{ color: "#e84020", fontSize: 12, fontWeight: 700 }}>⚠ 飲料水 117L 不足 / 食料 54食 不足</div>
        </div>

        <button style={{ width: "100%", boxShadow: `5px 5px 12px ${sh1}, -4px -4px 10px ${sh2}`, borderRadius: 10, padding: "12px", background: bg, border: "none", color: "#dde2ea", fontSize: 14, cursor: "pointer", fontWeight: 700 }}>
          診断する →
        </button>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────
   08. VOID SIGNAL — 極黒 + 赤はポイントのみ
   最もミニマル。余白大きく、赤を点として使う
──────────────────────────────────────────*/
function D08() {
  const bg = "#121212";
  const sh1 = "#080808", sh2 = "#1c1c1c";
  return (
    <Card label="08 — VOID SIGNAL">
      <div style={{ background: bg, height: "100%", padding: 32 }}>
        {/* Just text, very sparse */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#dd1122" }} />
            <span style={{ color: "#444", fontSize: 11, letterSpacing: "0.2em" }}>SYSTEM ACTIVE</span>
          </div>
          <div style={{ color: "#f0f0f0", fontSize: 26, fontWeight: 900, lineHeight: 1.1 }}>災害リスク<br />診断</div>
        </div>

        {/* Three big raised numbers */}
        <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
          {[{ v: "72", l: "地震" }, { v: "34", l: "津波" }, { v: "18", l: "火山" }].map(item => (
            <div key={item.l} style={{ boxShadow: `6px 6px 16px ${sh1}, -4px -4px 12px ${sh2}`, borderRadius: 12, flex: 1, padding: "16px 8px", textAlign: "center" }}>
              <div style={{ color: "#dd1122", fontSize: 30, fontWeight: 900 }}>{item.v}</div>
              <div style={{ color: "#333", fontSize: 10, marginTop: 4 }}>{item.l}</div>
            </div>
          ))}
        </div>

        {/* Inset clean list */}
        <div style={{ boxShadow: `inset 5px 5px 14px ${sh1}, inset -4px -4px 12px ${sh2}`, borderRadius: 14, padding: 20, marginBottom: 24 }}>
          {[["停電", "5日"], ["断水", "9日"], ["食料遅延", "9日"], ["トイレ", "9日"]].map(([l, v], i) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", paddingBottom: i < 3 ? 12 : 0, marginBottom: i < 3 ? 12 : 0, borderBottom: i < 3 ? "1px solid #1a1a1a" : "none" }}>
              <span style={{ color: "#555", fontSize: 13 }}>{l}</span>
              <span style={{ color: "#f0f0f0", fontWeight: 700, fontSize: 13 }}>{v}</span>
            </div>
          ))}
        </div>

        <button style={{ width: "100%", boxShadow: `5px 5px 14px ${sh1}, -4px -4px 12px ${sh2}`, borderRadius: 12, padding: "14px", background: bg, border: "none", color: "#dd1122", fontSize: 15, cursor: "pointer", fontWeight: 900 }}>
          診断する →
        </button>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────
   09. LAVA STONE — 熔岩石テクスチャ + 深紅
   暗褐色に近い黒。凹凸はより荒々しく深く
──────────────────────────────────────────*/
function D09() {
  const bg = "#181210";
  const sh1 = "#0d0b09", sh2 = "#231c18";
  return (
    <Card label="09 — LAVA STONE">
      <div style={{ background: bg, height: "100%", padding: 28 }}>
        <div style={{ boxShadow: `8px 8px 20px ${sh1}, -5px -5px 14px ${sh2}`, borderRadius: 16, padding: 22, marginBottom: 18 }}>
          <div style={{ color: "#8b2a2a", fontSize: 10, letterSpacing: "0.3em", marginBottom: 6 }}>HAZARD ANALYSIS</div>
          <div style={{ color: "#e0d8d5", fontSize: 22, fontWeight: 900 }}>災害リスク診断</div>
          <div style={{ marginTop: 14, display: "flex", gap: 16 }}>
            {[{ l: "地震", v: 72, c: "#cc2233" }, { l: "津波", v: 34, c: "#883322" }, { l: "火山", v: 18, c: "#552211" }].map(item => (
              <div key={item.l}>
                <div style={{ color: item.c, fontSize: 24, fontWeight: 900 }}>{item.v}</div>
                <div style={{ color: "#4a3a35", fontSize: 10 }}>{item.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
          {[["停電", "5日"], ["断水", "9日"], ["食料遅延", "9日"], ["トイレ", "9日"]].map(([l, v]) => (
            <div key={l} style={{ boxShadow: `inset 5px 5px 12px ${sh1}, inset -4px -4px 10px ${sh2}`, borderRadius: 10, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#5a4a44", fontSize: 12 }}>{l}</span>
              <span style={{ color: "#cc2233", fontWeight: 900, fontSize: 16 }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{ boxShadow: `inset 4px 4px 10px ${sh1}, inset -3px -3px 8px ${sh2}`, borderRadius: 10, padding: 14, marginBottom: 18, borderLeft: "3px solid #8b2a2a" }}>
          <div style={{ color: "#cc2233", fontSize: 13, fontWeight: 700 }}>⚠ 飲料水 117L 不足</div>
          <div style={{ color: "#6b2222", fontSize: 11, marginTop: 2 }}>食料 54食 / 携帯トイレ 90回分 不足</div>
        </div>

        <button style={{ width: "100%", boxShadow: `6px 6px 16px ${sh1}, -4px -4px 12px ${sh2}`, borderRadius: 12, padding: "13px", background: bg, border: "none", color: "#cc2233", fontSize: 14, cursor: "pointer", fontWeight: 900 }}>
          診断する →
        </button>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────
   10. NIGHT OPS — 最も洗練。赤白コントラスト
   黒ニューモ + 白文字 + 赤を面積多めに投入
──────────────────────────────────────────*/
function D10() {
  const bg = "#171717";
  const sh1 = "#0c0c0c", sh2 = "#222";
  return (
    <Card label="10 — NIGHT OPS">
      <div style={{ background: bg, height: "100%", padding: 0, display: "flex", flexDirection: "column" }}>
        {/* Red header block */}
        <div style={{ background: "#cc2233", padding: "20px 24px" }}>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: "0.3em", marginBottom: 4 }}>DISASTER RISK</div>
          <div style={{ color: "#fff", fontSize: 22, fontWeight: 900 }}>災害リスク診断</div>
          <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
            {[["72", "地震"], ["34", "津波"], ["18", "火山"]].map(([v, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ color: "#fff", fontSize: 22, fontWeight: 900 }}>{v}</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Dark body */}
        <div style={{ flex: 1, padding: 22 }}>
          <div style={{ boxShadow: `inset 5px 5px 12px ${sh1}, inset -4px -4px 10px ${sh2}`, borderRadius: 12, padding: 18, marginBottom: 16 }}>
            <div style={{ color: "#555", fontSize: 10, letterSpacing: "0.2em", marginBottom: 10 }}>ライフライン途絶推計</div>
            {[["停電", 5, 36], ["断水", 9, 64], ["食料遅延", 9, 64], ["トイレ", 9, 64]].map(([l, v, p]) => (
              <div key={l as string} style={{ marginBottom: 9 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: "#666" }}>{l}</span>
                  <span style={{ color: "#e0e0e0", fontWeight: 700 }}>{v}日</span>
                </div>
                <div style={{ boxShadow: `inset 2px 2px 4px ${sh1}`, borderRadius: 4, height: 5 }}>
                  <div style={{ width: `${p}%`, height: "100%", background: "#cc2233", opacity: 0.9 }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ boxShadow: `4px 4px 10px ${sh1}, -3px -3px 8px ${sh2}`, borderRadius: 10, padding: "10px 14px", marginBottom: 16 }}>
            <div style={{ color: "#cc2233", fontSize: 12, fontWeight: 700 }}>⚠ 飲料水 117L 不足</div>
            <div style={{ color: "#663333", fontSize: 11, marginTop: 2 }}>食料 54食 不足</div>
          </div>

          <button style={{ width: "100%", background: "#cc2233", borderRadius: 10, padding: "13px", border: "none", color: "#fff", fontSize: 14, cursor: "pointer", fontWeight: 900 }}>
            診断する →
          </button>
        </div>
      </div>
    </Card>
  );
}
