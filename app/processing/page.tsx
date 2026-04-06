"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// ─── 各処理ステップの数式と説明 ───
const STEPS = [
  {
    label: "ハザード確率密度関数",
    formula: "P(eq|x) = Σᵢ [ sᵢ·wᵢ + λ(1 − e^{−μᵢt}) ]",
    detail: "seismic intensity weighted hazard integration",
    vars: ["s=6.0", "w=0.50", "λ=0.31", "μ=0.47"],
    result: "49.00",
  },
  {
    label: "津波到達時間解析",
    formula: "T(d,v) = d·α ∫₀^∞ f(v)·v⁻¹dv + ε_arrival",
    detail: "shallow water wave propagation — Green's law",
    vars: ["d=1.0m", "α=5.0", "v=40ms⁻¹", "t=40min"],
    result: "7.44",
  },
  {
    label: "火山灰降下モデル",
    formula: "A(x,t) = Q/(4πDt) · exp(−|x−μ|²/4Dt)",
    detail: "advection-diffusion ash dispersion kernel",
    vars: ["Q=15cm", "D=0.82", "t=2.4h", "σ=1.0"],
    result: "15.00",
  },
  {
    label: "地震動強度スペクトル",
    formula: "Sₐ(f) = |H(f)|² · G(f) · exp(−πf·κ)",
    detail: "Fourier amplitude spectrum attenuation fit",
    vars: ["f=2Hz", "κ=0.04", "Q=120", "r=38km"],
    result: "0.847g",
  },
  {
    label: "ライフライン途絶推定",
    formula: "L(t) = P_eq·0.6·τ_pow + P_ash·0.4·τ_ash",
    detail: "fragility curve convolution — HAZUS MR5",
    vars: ["Peq=0.49", "τ=14d", "Pash=0.05", "τ=7d"],
    result: "[4, 8, 8, 8]",
  },
  {
    label: "備蓄必要量テンソル計算",
    formula: "N = size · diag(3, 3, 0.5, 5) · L^T",
    detail: "household-weighted disruption duration tensor",
    vars: ["n=3", "w=[54, 72, 6, 120]", "stock=[6L,3d]"],
    result: "Δ=[⁻⁰L, ⁻⁴⁵食, 120回, 6個]",
  },
  {
    label: "Greedy最適化アルゴリズム",
    formula: "S* = argmin Σⱼ cⱼ·xⱼ  s.t. Σⱼ qⱼ·xⱼ ≥ Nᵢ",
    detail: "price-per-unit ratio sort → greedy fill",
    vars: ["c=[3980,5800]", "q=[100L,30食]", "iter=4"],
    result: "¥52,180",
  },
  {
    label: "リスク統合スコア確定",
    formula: "R_final = w^T · [E_eq, T_ts, A_ash]^T + ε",
    detail: "multi-hazard aggregation — final output commit",
    vars: ["w=[0.5,0.3,0.2]", "E=49", "T=7", "A=15"],
    result: "COMMITTED",
  },
];

const STEP_STARTS = [0, 350, 680, 1000, 1280, 1560, 1840, 2100];
const ALL_DONE_AT = 2500;
const NAVIGATE_AT = 3600;

// Matrix背景用文字セット
const CHARS = "0123456789ABCDEFΩΣΔΨΦΓαβγδεζηθλμνξπρστυφχψω∫∂∇√∞≈≠≤±×∈∑∏⊗⊕∀∃⊂⊆∧∨⊥";

export default function ProcessingPage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeStep, setActiveStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  // 数値カウンター
  const [floatGrid, setFloatGrid] = useState<string[][]>(
    Array.from({ length: 4 }, () => Array.from({ length: 6 }, () => "0.0000"))
  );
  const [iterCount, setIterCount] = useState(0);
  const [residual, setResidual] = useState(1.0);
  // ─── Matrix落下背景 ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const cols = Math.floor(canvas.width / 16);
    const drops = Array.from({ length: cols }, () => Math.random() * -50);

    const draw = () => {
      ctx.fillStyle = "rgba(30,30,30,0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        const y = drops[i] * 16;

        // 先頭は明るい赤、後続はだんだん暗く
        const brightness = Math.random() > 0.95 ? "rgba(255,80,80,0.9)" : "rgba(180,20,30,0.25)";
        ctx.fillStyle = brightness;
        ctx.font = "12px monospace";
        ctx.fillText(ch, i * 16, y);

        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        else drops[i] += 0.5;
      }
    };

    const raf = setInterval(draw, 40);
    return () => {
      clearInterval(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // ─── メインロジック ───
  useEffect(() => {
    if (!sessionStorage.getItem("diagnosisResult")) {
      router.replace("/");
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    STEP_STARTS.forEach((start, i) => {
      timers.push(setTimeout(() => {
        setActiveStep(i);
        setProgress(Math.round((i / STEPS.length) * 92));
      }, start));

      const doneAt = i < STEP_STARTS.length - 1
        ? STEP_STARTS[i + 1] - 80
        : ALL_DONE_AT - 100;

      timers.push(setTimeout(() => {
        setCompletedSteps(prev => new Set([...prev, i]));
      }, doneAt));
    });

    timers.push(setTimeout(() => {
      setProgress(100);
      setDone(true);
    }, ALL_DONE_AT));

    timers.push(setTimeout(() => {
      router.push("/result");
    }, NAVIGATE_AT));

    // 数値グリッド更新
    const gridInterval = setInterval(() => {
      setFloatGrid(
        Array.from({ length: 4 }, () =>
          Array.from({ length: 6 }, () => (Math.random() * 999).toFixed(4))
        )
      );
      setIterCount(n => n + Math.floor(Math.random() * 128 + 32));
      setResidual(r => Math.max(r * (0.85 + Math.random() * 0.1), 0.000001));
    }, 80);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(gridInterval);
    };
  }, [router]);

  const current = STEPS[activeStep] ?? null;

  return (
    <>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeSlide { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glow { 0%,100%{text-shadow:0 0 8px rgba(255,26,46,0.4)} 50%{text-shadow:0 0 20px rgba(255,26,46,0.9)} }
        @keyframes scanH { 0%{top:-2px;opacity:0.8} 100%{top:100%;opacity:0} }
        @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
        @keyframes mapScanLine { 0%{transform:translateY(0px);opacity:1} 95%{opacity:1} 100%{transform:translateY(180px);opacity:0} }
        @keyframes mapClipGrow { from{height:0px} to{height:180px} }
        @keyframes mapGlowMove { from{transform:translateY(-12px)} to{transform:translateY(183px)} }
        @keyframes cityPulse { 0%,100%{opacity:0.3} 50%{opacity:1} }
      `}</style>

      {/* Matrix背景 */}
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />

      {/* オーバーレイ */}
      <div style={{ position: "fixed", inset: 0, zIndex: 1, background: "rgba(30,30,30,0.55)", pointerEvents: "none" }} />

      {/* メインコンテンツ */}
      <div style={{ position: "relative", zIndex: 2, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
        <div style={{ width: "100%", maxWidth: 700 }}>

          {/* ヘッダー */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ color: "#555", fontSize: 10, letterSpacing: "0.35em", fontFamily: "monospace", marginBottom: 8 }}>
              DISASTER RISK ANALYSIS ENGINE v2.0
            </div>
            <div style={{ color: done ? "#4a9960" : "#ff1a2e", fontSize: 22, fontWeight: 900, letterSpacing: "0.05em", animation: done ? "none" : "glow 1.2s ease-in-out infinite" }}>
              {done ? "█ COMPUTATION COMPLETE" : "█ SOLVING HAZARD EQUATIONS..."}
              {!done && <span style={{ animation: "blink 0.7s ease-in-out infinite" }}>_</span>}
            </div>
          </div>

          {/* 現在の数式パネル */}
          {current && (
            <div key={activeStep} style={{
              background: "rgba(20,20,20,0.9)",
              border: "1px solid rgba(255,26,46,0.3)",
              borderRadius: 12,
              padding: "18px 20px",
              marginBottom: 16,
              position: "relative",
              overflow: "hidden",
              animation: "fadeSlide 0.25s ease-out",
              boxShadow: "0 0 30px rgba(255,26,46,0.08)",
            }}>
              {/* スキャンライン */}
              <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: "rgba(255,26,46,0.5)", animation: "scanH 1.4s linear infinite", pointerEvents: "none" }} />

              <div style={{ color: "#ff1a2e", fontSize: 9, fontFamily: "monospace", letterSpacing: "0.2em", marginBottom: 10 }}>
                SOLVING [{String(activeStep + 1).padStart(2, "0")}/{STEPS.length}] — {current.label}
              </div>

              {/* 数式本体 */}
              <div style={{ color: "#e8e8e8", fontSize: 15, fontFamily: "monospace", fontWeight: 700, marginBottom: 8, lineHeight: 1.5, letterSpacing: "0.03em" }}>
                {current.formula}
              </div>
              <div style={{ color: "#555", fontSize: 10, fontFamily: "monospace", marginBottom: 14 }}>
                ↳ {current.detail}
              </div>

              {/* 変数 + 結果 */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                {current.vars.map((v, i) => (
                  <span key={i} style={{
                    background: "rgba(255,26,46,0.08)",
                    border: "1px solid rgba(255,26,46,0.2)",
                    borderRadius: 4,
                    padding: "3px 8px",
                    color: "#cc4455",
                    fontSize: 11,
                    fontFamily: "monospace",
                  }}>{v}</span>
                ))}
                <span style={{ marginLeft: "auto", color: "#ff1a2e", fontSize: 13, fontFamily: "monospace", fontWeight: 900 }}>
                  = {current.result}
                </span>
              </div>
            </div>
          )}

          {/* 日本地図スキャンパネル */}
          <div style={{
            background: "rgba(20,20,20,0.85)",
            border: "1px solid rgba(255,26,46,0.2)",
            borderRadius: 12,
            padding: "12px 16px",
            marginBottom: 16,
            display: "flex",
            gap: 16,
            alignItems: "center",
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ color: "#ff1a2e", fontSize: 9, fontFamily: "monospace", letterSpacing: "0.2em" }}>GEOGRAPHIC HAZARD SCAN</span>
                <span style={{ color: "#444", fontSize: 9, fontFamily: "monospace" }}>130°E–146°E | 31°N–45°N</span>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ position: "relative", width: 180, height: 180 }}>

                  {/* SVGフィルター定義: 白→透明, 赤→#ff1a2e */}
                  <svg width="0" height="0" style={{ position: "absolute" }}>
                    <defs>
                      {/* 明るい: 白を透明化し陸地を#ff1a2eに */}
                      <filter id="japanMapBright" colorInterpolationFilters="sRGB">
                        <feColorMatrix type="saturate" values="0" result="gray"/>
                        <feComponentTransfer in="gray" result="inv">
                          <feFuncR type="linear" slope="-1" intercept="1"/>
                          <feFuncG type="linear" slope="-1" intercept="1"/>
                          <feFuncB type="linear" slope="-1" intercept="1"/>
                        </feComponentTransfer>
                        <feColorMatrix in="inv" type="matrix" values="0 0 0 0 1  0 0 0 0 0.102  0 0 0 0 0.18  0.6 0.6 0.6 0 0"/>
                      </filter>
                      {/* 暗い: 同じ変換+透明度30% */}
                      <filter id="japanMapDim" colorInterpolationFilters="sRGB">
                        <feColorMatrix type="saturate" values="0" result="gray"/>
                        <feComponentTransfer in="gray" result="inv">
                          <feFuncR type="linear" slope="-1" intercept="1"/>
                          <feFuncG type="linear" slope="-1" intercept="1"/>
                          <feFuncB type="linear" slope="-1" intercept="1"/>
                        </feComponentTransfer>
                        <feColorMatrix in="inv" type="matrix" values="0 0 0 0 1  0 0 0 0 0.102  0 0 0 0 0.18  0.6 0.6 0.6 0 0" result="colored"/>
                        <feComponentTransfer in="colored">
                          <feFuncA type="linear" slope="0.28"/>
                        </feComponentTransfer>
                      </filter>
                    </defs>
                  </svg>

                  {/* グリッド */}
                  <svg width="180" height="180" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
                    {[30,60,90,120,150].map(x => (
                      <line key={`gx${x}`} x1={x} y1={0} x2={x} y2={180} stroke="rgba(255,26,46,0.07)" strokeWidth="0.5" />
                    ))}
                    {[30,60,90,120,150].map(y => (
                      <line key={`gy${y}`} x1={0} y1={y} x2={180} y2={y} stroke="rgba(255,26,46,0.07)" strokeWidth="0.5" />
                    ))}
                  </svg>

                  {/* ベース（暗い：未スキャン） */}
                  <img src="/japan-map.png" alt="" style={{
                    width: 180, height: 180, objectFit: "contain", display: "block",
                    filter: "url(#japanMapDim)",
                  }} />

                  {/* スキャン済み（明るい） */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, width: 148,
                    overflow: "hidden",
                    animation: "mapClipGrow 2s linear infinite",
                    zIndex: 2,
                  }}>
                    <img src="/japan-map.png" alt="" style={{
                      width: 180, height: 180, objectFit: "contain", display: "block",
                      filter: "url(#japanMapBright)",
                    }} />
                  </div>

                  {/* スキャンライン */}
                  <div style={{
                    position: "absolute", left: 0, right: 0, height: 2, top: 0,
                    background: "rgba(255,80,80,0.95)",
                    boxShadow: "0 -6px 10px rgba(255,26,46,0.35), 0 2px 6px rgba(255,26,46,0.35)",
                    animation: "mapScanLine 2s linear infinite",
                    zIndex: 3, pointerEvents: "none",
                  }} />

                  {/* 都市マーカー */}
                  {[
                    { x: 120, y: 29,  label: "SAPPORO" },
                    { x: 116, y: 77,  label: "SENDAI" },
                    { x: 105, y: 103, label: "TOKYO" },
                    { x: 78,  y: 108, label: "NAGOYA" },
                    { x: 64,  y: 113, label: "OSAKA" },
                    { x: 17,  y: 124, label: "FUKUOKA" },
                  ].map(city => {
                    const delay = `${(city.y / 180 * 2).toFixed(2)}s`;
                    return (
                      <div key={city.label} style={{
                        position: "absolute", left: city.x, top: city.y,
                        zIndex: 4, animation: `cityPulse 2s linear ${delay} infinite`,
                      }}>
                        <div style={{
                          width: 5, height: 5, borderRadius: "50%",
                          background: "#ff1a2e", border: "1px solid rgba(255,80,80,0.6)",
                          position: "absolute", transform: "translate(-50%,-50%)",
                        }} />
                        <span style={{
                          position: "absolute", left: 5, top: -3,
                          color: "rgba(255,120,120,0.85)",
                          fontSize: 5, fontFamily: "monospace", whiteSpace: "nowrap",
                        }}>{city.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 右側ステータス */}
            <div style={{ width: 110, flexShrink: 0 }}>
              {[
                { label: "SCAN LINE", value: "ACTIVE" },
                { label: "RESOLUTION", value: "180×180" },
                { label: "TARGETS", value: "6/6" },
                { label: "THREAT LV", value: done ? "HIGH" : "SCANNING" },
              ].map(({ label, value }) => (
                <div key={label} style={{ marginBottom: 10 }}>
                  <div style={{ color: "#444", fontSize: 8, fontFamily: "monospace", letterSpacing: "0.15em" }}>{label}</div>
                  <div style={{ color: "#ff1a2e", fontSize: 11, fontFamily: "monospace", fontWeight: 700 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 2カラム: ステップリスト + 数値グリッド */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>

            {/* ステップリスト */}
            <div style={{ background: "rgba(20,20,20,0.85)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ color: "#555", fontSize: 9, fontFamily: "monospace", letterSpacing: "0.2em", marginBottom: 10 }}>CALL STACK</div>
              {STEPS.map((step, i) => {
                const isCompleted = completedSteps.has(i);
                const isActive = activeStep === i && !isCompleted;
                const isPending = activeStep < i;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5, opacity: isPending ? 0.2 : 1, transition: "opacity 0.3s" }}>
                    <span style={{ color: isCompleted ? "#4a9960" : isActive ? "#ff1a2e" : "#333", fontSize: 9, fontFamily: "monospace", flexShrink: 0, animation: isActive ? "pulse 0.6s ease-in-out infinite" : "none" }}>
                      {isCompleted ? "✓" : isActive ? "▶" : "○"}
                    </span>
                    <span style={{ color: isCompleted ? "#aaa" : isActive ? "#e8e8e8" : "#444", fontSize: 10, fontFamily: "monospace" }}>
                      {step.label}
                    </span>
                    {isCompleted && (
                      <span style={{ marginLeft: "auto", color: "#2a6640", fontSize: 9, fontFamily: "monospace" }}>OK</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 数値グリッド */}
            <div style={{ background: "rgba(20,20,20,0.85)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "14px 16px", overflow: "hidden" }}>
              <div style={{ color: "#555", fontSize: 9, fontFamily: "monospace", letterSpacing: "0.2em", marginBottom: 10 }}>
                JACOBIAN MATRIX [{floatGrid.length}×{floatGrid[0]?.length}]
              </div>
              {floatGrid.map((row, ri) => (
                <div key={ri} style={{ display: "flex", gap: 6, marginBottom: 3 }}>
                  {row.map((val, ci) => (
                    <span key={ci} style={{ color: Math.random() > 0.85 ? "#ff1a2e" : "#2a3a2a", fontSize: 9, fontFamily: "monospace", flex: 1, textAlign: "right" }}>
                      {val}
                    </span>
                  ))}
                </div>
              ))}
              <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#333", fontSize: 9, fontFamily: "monospace" }}>iter</span>
                  <span style={{ color: "#cc2233", fontSize: 10, fontFamily: "monospace", fontWeight: 700 }}>{iterCount.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#333", fontSize: 9, fontFamily: "monospace" }}>residual</span>
                  <span style={{ color: residual < 0.001 ? "#4a9960" : "#cc2233", fontSize: 10, fontFamily: "monospace", fontWeight: 700 }}>{residual.toExponential(3)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* プログレスバー */}
          <div style={{ background: "rgba(20,20,20,0.85)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "12px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "#555", fontSize: 9, fontFamily: "monospace", letterSpacing: "0.2em" }}>COMPUTATION PROGRESS</span>
              <span style={{ color: "#ff1a2e", fontSize: 11, fontFamily: "monospace", fontWeight: 700 }}>{progress.toString().padStart(3, " ")}%</span>
            </div>
            <div style={{ height: 5, borderRadius: 3, background: "rgba(255,255,255,0.04)", overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(90deg, #4a0010, #aa1122, #ff1a2e)",
                borderRadius: 3,
                transition: "width 0.12s ease-out",
                boxShadow: "0 0 12px rgba(255,26,46,0.6)",
              }} />
            </div>

            {done && (
              <div style={{ marginTop: 12, textAlign: "center", animation: "fadeSlide 0.3s ease-out" }}>
                <span style={{ color: "#4a9960", fontSize: 11, fontFamily: "monospace", letterSpacing: "0.2em" }}>
                  ── ALL EQUATIONS CONVERGED · REDIRECTING ──
                </span>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
