import type { DiagnosisRequest, DiagnosisResponse, ProductCategory, SetItem } from "./types";

// ─── 都道府県別ハザード基礎値 ───
const PREFECTURE_HAZARD: Record<
  string,
  { shindo: number; liquefaction: number; collapse: number; floodDepth: number; arrivalTime: number; ashCm: number }
> = {
  北海道: { shindo: 5.0, liquefaction: 0.3, collapse: 0.2, floodDepth: 0.5, arrivalTime: 60, ashCm: 1 },
  青森県: { shindo: 5.5, liquefaction: 0.4, collapse: 0.3, floodDepth: 1.0, arrivalTime: 30, ashCm: 2 },
  岩手県: { shindo: 5.5, liquefaction: 0.4, collapse: 0.3, floodDepth: 5.0, arrivalTime: 15, ashCm: 2 },
  宮城県: { shindo: 6.0, liquefaction: 0.6, collapse: 0.4, floodDepth: 6.0, arrivalTime: 10, ashCm: 2 },
  秋田県: { shindo: 5.0, liquefaction: 0.3, collapse: 0.2, floodDepth: 1.0, arrivalTime: 30, ashCm: 2 },
  山形県: { shindo: 5.0, liquefaction: 0.3, collapse: 0.2, floodDepth: 0.5, arrivalTime: 60, ashCm: 3 },
  福島県: { shindo: 6.0, liquefaction: 0.5, collapse: 0.4, floodDepth: 3.0, arrivalTime: 20, ashCm: 5 },
  茨城県: { shindo: 5.5, liquefaction: 0.5, collapse: 0.3, floodDepth: 1.0, arrivalTime: 40, ashCm: 5 },
  栃木県: { shindo: 5.0, liquefaction: 0.3, collapse: 0.2, floodDepth: 0.1, arrivalTime: 999, ashCm: 5 },
  群馬県: { shindo: 5.0, liquefaction: 0.3, collapse: 0.2, floodDepth: 0.1, arrivalTime: 999, ashCm: 10 },
  埼玉県: { shindo: 5.5, liquefaction: 0.6, collapse: 0.3, floodDepth: 0.1, arrivalTime: 999, ashCm: 10 },
  千葉県: { shindo: 5.5, liquefaction: 0.7, collapse: 0.3, floodDepth: 2.0, arrivalTime: 30, ashCm: 10 },
  東京都: { shindo: 6.0, liquefaction: 0.6, collapse: 0.4, floodDepth: 1.0, arrivalTime: 40, ashCm: 15 },
  神奈川県: { shindo: 6.5, liquefaction: 0.7, collapse: 0.5, floodDepth: 4.0, arrivalTime: 5, ashCm: 20 },
  新潟県: { shindo: 5.5, liquefaction: 0.5, collapse: 0.3, floodDepth: 1.0, arrivalTime: 30, ashCm: 5 },
  富山県: { shindo: 5.5, liquefaction: 0.4, collapse: 0.3, floodDepth: 1.5, arrivalTime: 20, ashCm: 5 },
  石川県: { shindo: 6.0, liquefaction: 0.5, collapse: 0.4, floodDepth: 2.0, arrivalTime: 15, ashCm: 3 },
  福井県: { shindo: 5.5, liquefaction: 0.4, collapse: 0.3, floodDepth: 1.5, arrivalTime: 20, ashCm: 3 },
  山梨県: { shindo: 5.5, liquefaction: 0.4, collapse: 0.3, floodDepth: 0.5, arrivalTime: 999, ashCm: 50 },
  長野県: { shindo: 5.5, liquefaction: 0.3, collapse: 0.3, floodDepth: 0.1, arrivalTime: 999, ashCm: 20 },
  岐阜県: { shindo: 6.0, liquefaction: 0.5, collapse: 0.4, floodDepth: 0.5, arrivalTime: 999, ashCm: 10 },
  静岡県: { shindo: 6.5, liquefaction: 0.6, collapse: 0.5, floodDepth: 5.0, arrivalTime: 5, ashCm: 30 },
  愛知県: { shindo: 6.0, liquefaction: 0.7, collapse: 0.5, floodDepth: 3.0, arrivalTime: 10, ashCm: 5 },
  三重県: { shindo: 6.5, liquefaction: 0.6, collapse: 0.5, floodDepth: 5.0, arrivalTime: 3, ashCm: 5 },
  滋賀県: { shindo: 5.5, liquefaction: 0.4, collapse: 0.3, floodDepth: 0.5, arrivalTime: 999, ashCm: 3 },
  京都府: { shindo: 6.0, liquefaction: 0.5, collapse: 0.4, floodDepth: 1.0, arrivalTime: 30, ashCm: 3 },
  大阪府: { shindo: 6.5, liquefaction: 0.8, collapse: 0.5, floodDepth: 3.0, arrivalTime: 10, ashCm: 3 },
  兵庫県: { shindo: 6.5, liquefaction: 0.7, collapse: 0.5, floodDepth: 3.0, arrivalTime: 10, ashCm: 3 },
  奈良県: { shindo: 5.5, liquefaction: 0.4, collapse: 0.3, floodDepth: 0.5, arrivalTime: 999, ashCm: 2 },
  和歌山県: { shindo: 6.5, liquefaction: 0.5, collapse: 0.5, floodDepth: 6.0, arrivalTime: 3, ashCm: 3 },
  鳥取県: { shindo: 5.5, liquefaction: 0.4, collapse: 0.3, floodDepth: 2.0, arrivalTime: 20, ashCm: 2 },
  島根県: { shindo: 5.0, liquefaction: 0.3, collapse: 0.3, floodDepth: 2.0, arrivalTime: 20, ashCm: 2 },
  岡山県: { shindo: 5.5, liquefaction: 0.5, collapse: 0.3, floodDepth: 2.0, arrivalTime: 15, ashCm: 2 },
  広島県: { shindo: 5.5, liquefaction: 0.5, collapse: 0.4, floodDepth: 2.0, arrivalTime: 10, ashCm: 2 },
  山口県: { shindo: 5.5, liquefaction: 0.4, collapse: 0.3, floodDepth: 2.0, arrivalTime: 10, ashCm: 2 },
  徳島県: { shindo: 6.5, liquefaction: 0.6, collapse: 0.5, floodDepth: 7.0, arrivalTime: 2, ashCm: 3 },
  香川県: { shindo: 6.0, liquefaction: 0.5, collapse: 0.4, floodDepth: 4.0, arrivalTime: 5, ashCm: 2 },
  愛媛県: { shindo: 6.0, liquefaction: 0.5, collapse: 0.4, floodDepth: 5.0, arrivalTime: 3, ashCm: 2 },
  高知県: { shindo: 6.5, liquefaction: 0.6, collapse: 0.5, floodDepth: 8.0, arrivalTime: 2, ashCm: 3 },
  福岡県: { shindo: 5.5, liquefaction: 0.5, collapse: 0.3, floodDepth: 2.0, arrivalTime: 15, ashCm: 5 },
  佐賀県: { shindo: 5.0, liquefaction: 0.4, collapse: 0.3, floodDepth: 2.0, arrivalTime: 15, ashCm: 5 },
  長崎県: { shindo: 5.0, liquefaction: 0.4, collapse: 0.3, floodDepth: 3.0, arrivalTime: 10, ashCm: 10 },
  熊本県: { shindo: 6.0, liquefaction: 0.5, collapse: 0.4, floodDepth: 2.0, arrivalTime: 15, ashCm: 20 },
  大分県: { shindo: 5.5, liquefaction: 0.4, collapse: 0.3, floodDepth: 2.0, arrivalTime: 10, ashCm: 10 },
  宮崎県: { shindo: 6.5, liquefaction: 0.5, collapse: 0.5, floodDepth: 5.0, arrivalTime: 5, ashCm: 15 },
  鹿児島県: { shindo: 6.0, liquefaction: 0.5, collapse: 0.4, floodDepth: 3.0, arrivalTime: 5, ashCm: 80 },
  沖縄県: { shindo: 5.0, liquefaction: 0.3, collapse: 0.3, floodDepth: 3.0, arrivalTime: 10, ashCm: 1 },
};

const DEFAULT_HAZARD = { shindo: 5.5, liquefaction: 0.5, collapse: 0.3, floodDepth: 2.0, arrivalTime: 20, ashCm: 5 };

// ─── 商品カタログ（quantity = 1個あたりの提供量） ───
interface Product {
  id: string;
  category: ProductCategory;
  name: string;
  quantity: number;   // 提供量（リットル / 食 / 回 / 個）
  unit: string;
  price: number;
  amazon_url: string;
}

const TAG = "disasterdiagn-22";

const WATER_PRODUCTS: Product[] = [
  { id: "water-2l-12", category: "water", name: "サーフビバレッジ 長期保存水 2L×12本（5年保存）", quantity: 24, unit: "L", price: 2980, amazon_url: `https://www.amazon.co.jp/dp/B014FKLLXA?tag=${TAG}` },
  { id: "water-500ml-24", category: "water", name: "Happy Belly 長期保存水 500ml×24本（5年保存）", quantity: 12, unit: "L", price: 1680, amazon_url: `https://www.amazon.co.jp/dp/B077S3698L?tag=${TAG}` },
  { id: "water-purifier", category: "water", name: "SAKUTTO 携帯浄水器 防災・アウトドア用 日本正規品", quantity: 100, unit: "L", price: 3980, amazon_url: `https://www.amazon.co.jp/dp/B0BRCPTH3L?tag=${TAG}` },
];

const FOOD_PRODUCTS: Product[] = [
  { id: "food-alpha-10", category: "food", name: "尾西食品 アルファ米 10種類セット（5年保存）", quantity: 10, unit: "食", price: 3200, amazon_url: `https://www.amazon.co.jp/dp/B01LAWGDCU?tag=${TAG}` },
  { id: "food-set-3days", category: "food", name: "PEACEUP 5年保存 非常食セット 3日分 1人用", quantity: 9, unit: "食", price: 2980, amazon_url: `https://www.amazon.co.jp/dp/B0BVTDY7QY?tag=${TAG}` },
  { id: "food-can-6", category: "food", name: "吉野家 缶飯 牛丼 6缶セット 非常食・保存食", quantity: 6, unit: "食", price: 2500, amazon_url: `https://www.amazon.co.jp/dp/B07YTDRDDB?tag=${TAG}` },
];

const TOILET_PRODUCTS: Product[] = [
  { id: "toilet-50a", category: "toilet", name: "簡易トイレ SANYO50 50回分 日本製 15年保存", quantity: 50, unit: "回", price: 3200, amazon_url: `https://www.amazon.co.jp/dp/B0714Q37MM?tag=${TAG}` },
  { id: "toilet-50", category: "toilet", name: "モシモハック 簡易トイレ 50回分 15年保存", quantity: 50, unit: "回", price: 3200, amazon_url: `https://www.amazon.co.jp/dp/B0BQ9C64X3?tag=${TAG}` },
];

const BATTERY_PRODUCTS: Product[] = [
  { id: "battery-20000", category: "battery", name: "Philips ソーラーモバイルバッテリー 20000mAh LED/SOSライト付", quantity: 1, unit: "個", price: 6800, amazon_url: `https://www.amazon.co.jp/dp/B0BV2PQ934?tag=${TAG}` },
  { id: "battery-radio", category: "battery", name: "多機能防災ラジオ ソーラー・手回し充電 LED懐中電灯付", quantity: 1, unit: "個", price: 2980, amazon_url: `https://www.amazon.co.jp/dp/B0C3VQV977?tag=${TAG}` },
];

// ─── Greedy 商品選定（コスパ順で不足を埋める） ───
function selectProducts(shortage: number, catalog: Product[]): SetItem[] {
  if (shortage <= 0) return [];

  let remaining = shortage;
  const selected: SetItem[] = [];

  const sorted = [...catalog].sort((a, b) => (a.price / a.quantity) - (b.price / b.quantity));

  for (const p of sorted) {
    if (remaining <= 0) break;
    const count = Math.ceil(remaining / p.quantity);
    selected.push({
      id: p.id,
      category: p.category,
      name: p.name,
      count,
      url: p.amazon_url,
      price: p.price,
      quantity: p.quantity,
      unit: p.unit,
    });
    remaining -= p.quantity * count;
  }

  return selected;
}

// ─── メイン診断関数 ───
export function runDiagnosis(req: DiagnosisRequest): DiagnosisResponse {
  const hazard = PREFECTURE_HAZARD[req.address.prefecture] ?? DEFAULT_HAZARD;
  const { size, housingType, floorNumber = 1 } = req.household;
  const { waterLiters, foodDays } = req.currentStockpile;

  // 高層マンションは崩壊リスク軽減
  const collapseModifier = housingType === "apartment" && floorNumber > 5 ? 0.7 : 1.0;

  // ─── リスクスコア計算（仕様書ロジック） ───
  const earthquake_score = Math.min(
    100,
    (hazard.shindo * 10 * 0.5) + (hazard.liquefaction * 100 * 0.3) + (hazard.collapse * 100 * collapseModifier * 0.2)
  );

  const arrivalTimeSafe = Math.max(hazard.arrivalTime, 0.1);
  const tsunami_score = Math.min(
    100,
    (hazard.floodDepth * 5 * 0.7) + ((1 / arrivalTimeSafe) * 30 * 0.3)
  );

  const ash_score = Math.min(100, hazard.ashCm * 1.0);

  // ─── 生活影響（仕様書ロジック） ───
  const eqNorm = earthquake_score / 100;
  const ashNorm = ash_score / 100;

  const power_outage_days = Math.round((eqNorm * 14 * 0.6) + (ashNorm * 7 * 0.4));
  const water_outage_days = Math.round(eqNorm * 21 * 0.8);
  const food_delay_days = Math.max(power_outage_days, water_outage_days);
  const toilet_issue_days = water_outage_days;

  // ─── 備蓄必要量（仕様書ロジック） ───
  const water_needed = size * 3 * water_outage_days;
  const meals_needed = size * 3 * food_delay_days;
  const battery_needed = Math.ceil((size * power_outage_days) / 2);
  const toilet_needed = size * 5 * toilet_issue_days;

  // ─── 不足量（仕様書ロジック） ───
  const water_shortage = Math.max(0, water_needed - waterLiters);
  const food_shortage = Math.max(0, meals_needed - (size * 3 * foodDays));
  const toilet_shortage = toilet_needed;
  const battery_shortage = battery_needed;

  // ─── Greedy 商品選定 ───
  const items = [
    ...selectProducts(water_shortage, WATER_PRODUCTS),
    ...selectProducts(food_shortage, FOOD_PRODUCTS),
    ...selectProducts(toilet_shortage, TOILET_PRODUCTS),
    ...selectProducts(battery_shortage, BATTERY_PRODUCTS),
  ];

  const total_price = items.reduce((sum, item) => sum + item.price * item.count, 0);

  // ─── サマリーメッセージ ───
  const coverDays = Math.max(food_delay_days, water_outage_days, power_outage_days);
  const message = items.length === 0
    ? "現在の備蓄で十分です。備えを継続してください。"
    : `このセットで${coverDays}日間の備えが整います`;

  return {
    summary: { message },
    risk: {
      earthquake: Math.round(earthquake_score),
      tsunami: Math.round(tsunami_score),
      ash: Math.round(ash_score),
    },
    lifeline: {
      powerDays: power_outage_days,
      waterDays: water_outage_days,
      foodDelayDays: food_delay_days,
      toiletIssueDays: toilet_issue_days,
    },
    set: {
      total_price,
      items,
    },
  };
}
