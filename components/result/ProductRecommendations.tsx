import type { ProductRecommendation } from "@/lib/types";

const SH1 = "#111";
const SH2 = "#2b2b2b";

const CATEGORY_LABEL: Record<ProductRecommendation["category"], string> = {
  water: "飲料水",
  food: "食料",
  toilet: "トイレ",
  equipment: "防災用品",
};

interface Props {
  products: ProductRecommendation[];
}

export default function ProductRecommendations({ products }: Props) {
  return (
    <div style={{
      boxShadow: `5px 5px 14px ${SH1}, -4px -4px 10px ${SH2}`,
      borderRadius: 14,
      padding: "24px 22px",
    }}>
      <div style={{ color: "#888", fontSize: 10, letterSpacing: "0.2em", fontFamily: "monospace", marginBottom: 10 }}>
        RECOMMENDED ITEMS
      </div>
      <h3 style={{ color: "#e8e8e8", fontSize: 15, fontWeight: 700, margin: "0 0 22px", paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        おすすめ備蓄品
      </h3>
      <div style={{
        display: "flex",
        gap: 14,
        overflowX: "auto",
        paddingBottom: 8,
      }}>
        {products.map((product) => (
          <a
            key={product.id}
            href={product.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flexShrink: 0,
              width: 152,
              boxShadow: `4px 4px 10px ${SH1}, -3px -3px 8px ${SH2}`,
              borderRadius: 12,
              padding: "14px 12px",
              textDecoration: "none",
              display: "block",
              transition: "opacity 0.2s",
            }}
          >
            {/* 画像プレースホルダー */}
            <div style={{
              width: "100%", height: 90,
              background: "#252525",
              borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 12,
            }}>
              <span style={{ color: "#555", fontSize: 11, fontFamily: "monospace" }}>[ img ]</span>
            </div>
            <div style={{ color: "#ff1a2e", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 6 }}>
              {CATEGORY_LABEL[product.category]}
            </div>
            <div style={{ color: "#e8e8e8", fontSize: 12, fontWeight: 700, lineHeight: 1.5, marginBottom: 10 }}>
              {product.name}
            </div>
            <div style={{ color: "#e8e8e8", fontSize: 14, fontWeight: 900, marginBottom: 12 }}>
              ¥{product.priceYen.toLocaleString()}
            </div>
            <div style={{
              background: "linear-gradient(135deg, #7a0015, #cc1525, #ff1a2e)",
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              textAlign: "center",
              padding: "8px 6px",
              borderRadius: 7,
              letterSpacing: "0.03em",
            }}>
              Amazon で見る →
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
