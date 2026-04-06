import type { ShoppingSet as ShoppingSetType, ProductCategory } from "@/lib/types";

const SH1 = "#111";
const SH2 = "#2b2b2b";

const CATEGORY_LABEL: Record<ProductCategory, string> = {
  water: "飲料水",
  food: "食料",
  toilet: "トイレ",
  battery: "電源",
  purifier: "浄水器",
};

const CATEGORY_ICON: Record<ProductCategory, string> = {
  water: "💧",
  food: "🍚",
  toilet: "🚽",
  battery: "🔋",
  purifier: "🔵",
};

interface Props {
  set: ShoppingSetType;
  summaryMessage: string;
}

export default function ShoppingSet({ set, summaryMessage }: Props) {
  if (set.items.length === 0) {
    return (
      <div style={{
        boxShadow: `5px 5px 14px ${SH1}, -4px -4px 10px ${SH2}`,
        borderRadius: 14,
        padding: "24px 22px",
      }}>
        <div style={{ color: "#4a9960", fontSize: 15, fontWeight: 700, textAlign: "center", padding: "16px 0" }}>
          ✓ 現在の備蓄で十分です
        </div>
      </div>
    );
  }

  return (
    <div style={{
      boxShadow: `5px 5px 14px ${SH1}, -4px -4px 10px ${SH2}`,
      borderRadius: 14,
      padding: "24px 22px",
    }}>
      <div style={{ color: "#888", fontSize: 10, letterSpacing: "0.2em", fontFamily: "monospace", marginBottom: 10 }}>
        RECOMMENDED SET
      </div>
      <h3 style={{ color: "#e8e8e8", fontSize: 15, fontWeight: 700, margin: "0 0 16px", paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        おすすめ備蓄セット
      </h3>

      {/* サマリーメッセージ */}
      <div style={{
        background: "rgba(255,26,46,0.08)",
        border: "1px solid rgba(255,26,46,0.25)",
        borderRadius: 10,
        padding: "12px 16px",
        marginBottom: 20,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}>
        <span style={{ color: "#ff1a2e", fontSize: 16 }}>⚡</span>
        <span style={{ color: "#ff6677", fontSize: 13, fontWeight: 700 }}>{summaryMessage}</span>
      </div>

      {/* 商品リスト */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {set.items.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              boxShadow: `3px 3px 8px ${SH1}, -2px -2px 6px ${SH2}`,
              borderRadius: 10,
              padding: "14px 16px",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
          >
            {/* カテゴリアイコン */}
            <div style={{
              flexShrink: 0,
              width: 40, height: 40,
              boxShadow: `inset 3px 3px 6px ${SH1}, inset -2px -2px 4px ${SH2}`,
              borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18,
            }}>
              {CATEGORY_ICON[item.category]}
            </div>

            {/* 商品情報 */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ color: "#ff1a2e", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em" }}>
                  {CATEGORY_LABEL[item.category]}
                </span>
                <span style={{ color: "#555", fontSize: 10 }}>
                  {item.quantity}{item.unit}/個 × {item.count}個
                </span>
              </div>
              <div style={{ color: "#e8e8e8", fontSize: 13, fontWeight: 700, lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {item.name}
              </div>
            </div>

            {/* 価格 + 個数 */}
            <div style={{ flexShrink: 0, textAlign: "right" }}>
              <div style={{ color: "#ff1a2e", fontSize: 16, fontWeight: 900, lineHeight: 1 }}>
                ¥{(item.price * item.count).toLocaleString()}
              </div>
              {item.count > 1 && (
                <div style={{ color: "#666", fontSize: 10, marginTop: 3 }}>
                  ¥{item.price.toLocaleString()} × {item.count}
                </div>
              )}
              <div style={{ color: "#ff1a2e", fontSize: 10, marginTop: 6, letterSpacing: "0.05em" }}>
                Amazonで見る →
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* 合計金額 */}
      <div style={{
        boxShadow: `inset 4px 4px 10px ${SH1}, inset -3px -3px 8px ${SH2}`,
        borderRadius: 12,
        padding: "16px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
      }}>
        <div>
          <div style={{ color: "#888", fontSize: 11, letterSpacing: "0.1em", marginBottom: 4 }}>合計金額（税込）</div>
          <div style={{ color: "#bbb", fontSize: 11 }}>{set.items.length}商品</div>
        </div>
        <div style={{ color: "#ff1a2e", fontSize: 28, fontWeight: 900, lineHeight: 1 }}>
          ¥{set.total_price.toLocaleString()}
        </div>
      </div>

      {/* まとめてAmazonで見るボタン */}
      <a
        href="https://www.amazon.co.jp/s?k=防災+備蓄セット"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "block",
          width: "100%",
          background: "linear-gradient(135deg, #7a0015, #cc1525, #ff1a2e)",
          color: "#fff",
          fontWeight: 700,
          fontSize: 14,
          textAlign: "center",
          padding: "15px",
          borderRadius: 10,
          textDecoration: "none",
          letterSpacing: "0.05em",
          boxShadow: "0 4px 20px rgba(255,26,46,0.4)",
          boxSizing: "border-box",
        }}
      >
        Amazonで備蓄品を確認する →
      </a>
    </div>
  );
}
