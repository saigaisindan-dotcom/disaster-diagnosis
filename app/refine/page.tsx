"use client";
import { useEffect, useRef, useState } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&family=IBM+Plex+Sans+JP:wght@400;700&family=Zen+Kaku+Gothic+New:wght@400;700;900&family=Space+Grotesk:wght@400;700;800&display=swap');
  @keyframes barFill { from { width: 0% } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
  .bar-anim { animation: barFill 1s cubic-bezier(.4,0,.2,1) both; }
  .fade-up  { animation: fadeUp .5s ease both; }
`;

export default function RefinePage() {
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = CSS;
    document.head.appendChild(el);
    return () => { document.head.removeChild(el); };
  }, []);

  return (
    <>

      <div style={{ background: "#0d0d0d", minHeight: "100vh", padding: "48px 24px", fontFamily: "sans-serif" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>

          <p style={{ color: "#444", fontSize: 11, letterSpacing: "0.2em", fontFamily: "monospace", marginBottom: 6 }}>REFINE — 06 ANTHRACITE BASE</p>
          <h1 style={{ color: "#fff", fontSize: 20, fontWeight: 900, marginBottom: 48 }}>
            フォント / 余白 / アニメーション 調整
          </h1>

          {/* ════════════════════════════════
              SECTION 1: FONT VARIANTS
          ════════════════════════════════ */}
          <Section title="01 — フォント選択" sub="同じデザイン、フォントのみ変更">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 28 }}>
              <FontCard
                label="A — Noto Sans JP"
                sub="日本語 Web 標準。読みやすく安定感"
                fontBody="'Noto Sans JP', sans-serif"
                fontNum="'Space Grotesk', sans-serif"
              />
              <FontCard
                label="B — IBM Plex Sans JP"
                sub="エンジニアリング感。数字が映える"
                fontBody="'IBM Plex Sans JP', sans-serif"
                fontNum="'IBM Plex Sans JP', sans-serif"
              />
              <FontCard
                label="C — Zen Kaku Gothic New"
                sub="日本語優先。余白の効いたモダンさ"
                fontBody="'Zen Kaku Gothic New', sans-serif"
                fontNum="'Space Grotesk', sans-serif"
              />
            </div>
          </Section>

          {/* ════════════════════════════════
              SECTION 2: SPACING VARIANTS
          ════════════════════════════════ */}
          <Section title="02 — 余白 選択" sub="カード内のパディング・行間を3段階で比較">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 28 }}>
              <SpacingCard label="A — COMPACT" sub="情報密度高め。モバイル向き" pad={14} gap={7} barH={4} />
              <SpacingCard label="B — BALANCED" sub="バランス型（現行ベース）" pad={20} gap={10} barH={5} />
              <SpacingCard label="C — AIRY" sub="余白多め。高級感・余裕" pad={28} gap={14} barH={7} />
            </div>
          </Section>

          {/* ════════════════════════════════
              SECTION 3: ANIMATION VARIANTS
          ════════════════════════════════ */}
          <Section title="03 — アニメーション 選択" sub="ボタンを押すと再生">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 28 }}>
              <AnimCard
                label="A — INSTANT"
                sub="アニメなし。速度最優先"
                type="none"
              />
              <AnimCard
                label="B — SLIDE IN"
                sub="セクションが下からフェードイン。落ち着いた印象"
                type="fadeUp"
              />
              <AnimCard
                label="C — BAR FILL"
                sub="グラフが左から伸びる。データ可視化感"
                type="barFill"
              />
            </div>
          </Section>

          {/* ════════════════════════════════
              SECTION 4: BUTTON STYLE
          ════════════════════════════════ */}
          <Section title="04 — ボタン スタイル" sub="CTAボタンの見せ方">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              {[
                { label: "A — 赤ベタ塗り", bg: "#cc2233", color: "#fff", border: "none", shadow: "none" },
                { label: "B — アウトライン赤", bg: "transparent", color: "#cc2233", border: "2px solid #cc2233", shadow: "none" },
                { label: "C — ニューモ浮き", bg: "#1e1e1e", color: "#e0e0e0", border: "none", shadow: "5px 5px 12px #111, -4px -4px 10px #2b2b2b" },
                { label: "D — 赤グラデーション", bg: "linear-gradient(90deg, #aa1122, #ff1a2e)", color: "#fff", border: "none", shadow: "0 4px 16px #cc223344" },
              ].map(b => (
                <button
                  key={b.label}
                  style={{ padding: "13px 28px", borderRadius: 10, fontSize: 14, cursor: "pointer", fontWeight: 700, background: b.bg, color: b.color, border: b.border, boxShadow: b.shadow, fontFamily: "'Noto Sans JP', sans-serif", transition: "opacity .15s" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  {b.label}　→
                </button>
              ))}
            </div>
          </Section>

        </div>
      </div>
    </>
  );
}

/* ─── Section wrapper ─── */
function Section({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 64 }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ color: "#cc2233", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 4 }}>{title}</div>
        <div style={{ color: "#555", fontSize: 12 }}>{sub}</div>
      </div>
      {children}
    </div>
  );
}

/* ─── Font Card ─── */
function FontCard({ label, sub, fontBody, fontNum }: { label: string; sub: string; fontBody: string; fontNum: string }) {
  const bg = "#1e1e1e", sh1 = "#111", sh2 = "#2b2b2b";
  return (
    <div>
      <div style={{ color: "#555", fontSize: 11, fontFamily: "monospace", marginBottom: 8, letterSpacing: "0.12em" }}>{label}</div>
      <div style={{ color: "#444", fontSize: 11, marginBottom: 10, fontFamily: fontBody }}>{sub}</div>
      <div style={{ background: bg, borderRadius: 4, padding: 20, border: "1px solid #1a1a1a" }}>
        {/* Title */}
        <div style={{ fontFamily: fontBody, marginBottom: 16 }}>
          <div style={{ color: "#666", fontSize: 10, letterSpacing: "0.25em", marginBottom: 6 }}>DISASTER RISK ANALYSIS</div>
          <div style={{ color: "#e8e8e8", fontSize: 20, fontWeight: 900 }}>災害リスク診断</div>
          <div style={{ height: 2, width: 36, background: "#ff1a2e", marginTop: 8 }} />
        </div>
        {/* Score pills */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
          {[{ l: "地震", v: 72, c: "#ff1a2e" }, { l: "津波", v: 34, c: "#cc1525" }, { l: "火山", v: 18, c: "#991020" }].map(item => (
            <div key={item.l} style={{ boxShadow: `4px 4px 10px ${sh1}, -3px -3px 8px ${sh2}`, borderRadius: 10, padding: "12px 6px", textAlign: "center" }}>
              <div style={{ color: item.c, fontSize: 22, fontWeight: 900, fontFamily: fontNum }}>{item.v}</div>
              <div style={{ color: "#444", fontSize: 10, marginTop: 2, fontFamily: fontBody }}>{item.l}</div>
            </div>
          ))}
        </div>
        {/* Bars */}
        <div style={{ boxShadow: `inset 4px 4px 10px ${sh1}, inset -3px -3px 8px ${sh2}`, borderRadius: 10, padding: "14px 16px" }}>
          {[["停電", 5, 36], ["断水", 9, 64], ["食料遅延", 9, 64]].map(([l, v, p]) => (
            <div key={l as string} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 3, fontFamily: fontBody }}>
                <span style={{ color: "#888" }}>{l}</span>
                <span style={{ color: "#ff1a2e", fontWeight: 700, fontFamily: fontNum }}>{v}日</span>
              </div>
              <div style={{ boxShadow: `inset 2px 2px 4px ${sh1}`, borderRadius: 4, height: 5 }}>
                <div style={{ width: `${p}%`, height: "100%", background: "linear-gradient(90deg, #4a0010, #aa1122, #ff1a2e)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Spacing Card ─── */
function SpacingCard({ label, sub, pad, gap, barH }: { label: string; sub: string; pad: number; gap: number; barH: number }) {
  const bg = "#1e1e1e", sh1 = "#111", sh2 = "#2b2b2b";
  return (
    <div>
      <div style={{ color: "#555", fontSize: 11, fontFamily: "monospace", marginBottom: 8, letterSpacing: "0.12em" }}>{label}</div>
      <div style={{ color: "#444", fontSize: 11, marginBottom: 10 }}>{sub}</div>
      <div style={{ background: bg, borderRadius: 4, padding: pad, border: "1px solid #1a1a1a" }}>
        <div style={{ marginBottom: gap * 1.5 }}>
          <div style={{ color: "#666", fontSize: 10, letterSpacing: "0.25em", marginBottom: gap * 0.6 }}>DISASTER RISK ANALYSIS</div>
          <div style={{ color: "#e8e8e8", fontSize: pad < 18 ? 18 : pad < 24 ? 20 : 22, fontWeight: 900 }}>災害リスク診断</div>
          <div style={{ height: 2, width: 36, background: "#ff1a2e", marginTop: gap }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: gap * 0.8, marginBottom: gap * 1.5 }}>
          {[{ l: "地震", v: 72, c: "#ff1a2e" }, { l: "津波", v: 34, c: "#cc1525" }, { l: "火山", v: 18, c: "#991020" }].map(item => (
            <div key={item.l} style={{ boxShadow: `4px 4px 10px ${sh1}, -3px -3px 8px ${sh2}`, borderRadius: 10, padding: `${gap * 1.2}px ${gap * 0.6}px`, textAlign: "center" }}>
              <div style={{ color: item.c, fontSize: 20, fontWeight: 900 }}>{item.v}</div>
              <div style={{ color: "#444", fontSize: 9, marginTop: 2 }}>{item.l}</div>
            </div>
          ))}
        </div>
        <div style={{ boxShadow: `inset 4px 4px 10px ${sh1}, inset -3px -3px 8px ${sh2}`, borderRadius: 10, padding: gap * 1.2 }}>
          {[["停電", 5, 36], ["断水", 9, 64], ["食料遅延", 9, 64]].map(([l, v, p]) => (
            <div key={l as string} style={{ marginBottom: gap }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: gap * 0.4 }}>
                <span style={{ color: "#888" }}>{l}</span>
                <span style={{ color: "#ff1a2e", fontWeight: 700 }}>{v}日</span>
              </div>
              <div style={{ boxShadow: `inset 2px 2px 4px ${sh1}`, borderRadius: 4, height: barH }}>
                <div style={{ width: `${p}%`, height: "100%", background: "linear-gradient(90deg, #4a0010, #aa1122, #ff1a2e)", borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Animation Card ─── */
function AnimCard({ label, sub, type }: { label: string; sub: string; type: "none" | "fadeUp" | "barFill" }) {
  const [key, setKey] = useState(0);
  const bg = "#1e1e1e", sh1 = "#111", sh2 = "#2b2b2b";

  const delays = ["0ms", "80ms", "160ms", "240ms"];

  const fadeStyle = (i: number): React.CSSProperties =>
    type === "fadeUp"
      ? { animation: `fadeUp .5s ease ${delays[i]} both`, animationPlayState: key > 0 ? "running" : "paused" }
      : {};

  const barStyle = (pct: number, i: number): React.CSSProperties =>
    type === "barFill"
      ? { width: `${pct}%`, height: "100%", background: "linear-gradient(90deg, #4a0010, #aa1122, #ff1a2e)", borderRadius: 4, animation: `barFill 1s cubic-bezier(.4,0,.2,1) ${i * 120}ms both`, animationPlayState: key > 0 ? "running" : "paused" }
      : { width: `${pct}%`, height: "100%", background: "linear-gradient(90deg, #4a0010, #aa1122, #ff1a2e)", borderRadius: 4 };

  return (
    <div>
      <div style={{ color: "#555", fontSize: 11, fontFamily: "monospace", marginBottom: 8, letterSpacing: "0.12em" }}>{label}</div>
      <div style={{ color: "#444", fontSize: 11, marginBottom: 10 }}>{sub}</div>
      <div key={key} style={{ background: bg, borderRadius: 4, padding: 20, border: "1px solid #1a1a1a" }}>
        <div style={{ ...fadeStyle(0), marginBottom: 16 }}>
          <div style={{ color: "#666", fontSize: 10, letterSpacing: "0.25em", marginBottom: 6 }}>DISASTER RISK ANALYSIS</div>
          <div style={{ color: "#e8e8e8", fontSize: 20, fontWeight: 900 }}>災害リスク診断</div>
          <div style={{ height: 2, width: 36, background: "#ff1a2e", marginTop: 8 }} />
        </div>
        <div style={{ ...fadeStyle(1), display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
          {[{ l: "地震", v: 72, c: "#ff1a2e" }, { l: "津波", v: 34, c: "#cc1525" }, { l: "火山", v: 18, c: "#991020" }].map(item => (
            <div key={item.l} style={{ boxShadow: `4px 4px 10px ${sh1}, -3px -3px 8px ${sh2}`, borderRadius: 10, padding: "12px 6px", textAlign: "center" }}>
              <div style={{ color: item.c, fontSize: 22, fontWeight: 900 }}>{item.v}</div>
              <div style={{ color: "#444", fontSize: 10, marginTop: 2 }}>{item.l}</div>
            </div>
          ))}
        </div>
        <div style={{ ...fadeStyle(2), boxShadow: `inset 4px 4px 10px ${sh1}, inset -3px -3px 8px ${sh2}`, borderRadius: 10, padding: "14px 16px", marginBottom: 14 }}>
          {[["停電", 5, 36], ["断水", 9, 64], ["食料遅延", 9, 64]].map(([l, v, p], i) => (
            <div key={l as string} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 3 }}>
                <span style={{ color: "#888" }}>{l}</span>
                <span style={{ color: "#ff1a2e", fontWeight: 700 }}>{v}日</span>
              </div>
              <div style={{ boxShadow: `inset 2px 2px 4px ${sh1}`, borderRadius: 4, height: 5 }}>
                <div style={barStyle(p as number, i)} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => setKey(k => k + 1)}
        style={{ marginTop: 10, width: "100%", background: "#1e1e1e", border: "1px solid #333", color: "#666", padding: "8px", fontSize: 12, cursor: "pointer", borderRadius: 6 }}
      >
        ▶ 再生
      </button>
    </div>
  );
}
