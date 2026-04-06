import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "災害リスク診断 — 南海トラフ・津波・噴火リスクを無料チェック";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#1e1e1e",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* グリッド背景 */}
        <svg
          style={{ position: "absolute", inset: 0 }}
          width="1200"
          height="630"
        >
          {[100,200,300,400,500,600,700,800,900,1000,1100].map((x) => (
            <line key={`x${x}`} x1={x} y1={0} x2={x} y2={630} stroke="rgba(255,26,46,0.06)" strokeWidth="1" />
          ))}
          {[100,200,300,400,500].map((y) => (
            <line key={`y${y}`} x1={0} y1={y} x2={1200} y2={y} stroke="rgba(255,26,46,0.06)" strokeWidth="1" />
          ))}
        </svg>

        {/* 左上ラベル */}
        <div style={{
          position: "absolute", top: 48, left: 72,
          color: "#555", fontSize: 18, letterSpacing: "0.3em",
          display: "flex",
        }}>
          DISASTER RISK ANALYSIS ENGINE v2.0
        </div>

        {/* メインコンテンツ */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          display: "flex", alignItems: "center", paddingLeft: 72,
        }}>
          {/* 左側テキスト */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>

            {/* タグライン */}
            <div style={{
              display: "flex", alignItems: "center", gap: 12, marginBottom: 24,
            }}>
              <div style={{ width: 32, height: 3, background: "#ff1a2e" }} />
              <span style={{ color: "#ff1a2e", fontSize: 20, letterSpacing: "0.25em" }}>
                無料診断サービス
              </span>
            </div>

            {/* メインタイトル */}
            <div style={{
              color: "#f0f0f0", fontSize: 72, fontWeight: 900,
              lineHeight: 1.15, marginBottom: 28,
              display: "flex", flexDirection: "column",
            }}>
              <span>あなたの地域の</span>
              <span style={{ color: "#ff1a2e" }}>災害リスク</span>
              <span>を診断する</span>
            </div>

            {/* 説明 */}
            <div style={{
              color: "#888", fontSize: 26, lineHeight: 1.6,
              marginBottom: 40, maxWidth: 560,
              display: "flex",
            }}>
              南海トラフ地震・津波・富士山噴火のリスクと<br/>必要な備蓄量をAIが算出
            </div>

            {/* バッジ */}
            <div style={{ display: "flex", gap: 16 }}>
              {["南海トラフ地震", "津波リスク", "富士山噴火", "備蓄量算出"].map((tag) => (
                <div key={tag} style={{
                  background: "rgba(255,26,46,0.1)",
                  border: "1px solid rgba(255,26,46,0.35)",
                  borderRadius: 6,
                  padding: "8px 18px",
                  color: "#cc3344",
                  fontSize: 18,
                  display: "flex",
                }}>
                  {tag}
                </div>
              ))}
            </div>
          </div>

          {/* 右側パネル */}
          <div style={{
            width: 320, marginRight: 72,
            background: "rgba(20,20,20,0.9)",
            border: "1px solid rgba(255,26,46,0.25)",
            borderRadius: 16, padding: "32px 28px",
            display: "flex", flexDirection: "column", gap: 24,
          }}>
            {/* スコア表示 */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#555", fontSize: 13, letterSpacing: "0.2em" }}>HAZARD SCORE</span>
              <span style={{ color: "#ff1a2e", fontSize: 64, fontWeight: 900, lineHeight: 1 }}>84</span>
              <span style={{ color: "#cc3344", fontSize: 15 }}>/ 100点</span>
            </div>

            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", display: "flex" }} />

            {/* 3項目 */}
            {[
              { label: "地震リスク", value: "HIGH", color: "#ff1a2e" },
              { label: "津波リスク", value: "MED", color: "#e6a800" },
              { label: "噴火リスク", value: "LOW", color: "#4a9960" },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#666", fontSize: 16 }}>{label}</span>
                <span style={{ color, fontSize: 18, fontWeight: 700 }}>{value}</span>
              </div>
            ))}

            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", display: "flex" }} />

            {/* URL */}
            <div style={{ color: "#444", fontSize: 14, letterSpacing: "0.05em", display: "flex" }}>
              disaster-diagnosis.com
            </div>
          </div>
        </div>

        {/* 下部バー */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: 4, background: "linear-gradient(90deg, #4a0010, #aa1122, #ff1a2e, #aa1122, #4a0010)",
          display: "flex",
        }} />
      </div>
    ),
    { ...size }
  );
}
