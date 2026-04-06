import type { UseFormRegister, FieldErrors } from "react-hook-form";

const PREFECTURES = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
  "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
  "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
  "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県",
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#252525",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 8,
  padding: "12px 14px",
  color: "#e8e8e8",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
};

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: FieldErrors<any>;
}

export default function AddressInput({ register, errors }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <label style={{ display: "block", color: "#bbb", fontSize: 12, fontWeight: 500, marginBottom: 8, letterSpacing: "0.05em" }}>
          都道府県 <span style={{ color: "#ff1a2e" }}>*</span>
        </label>
        <select
          {...register("prefecture", { required: "都道府県を選択してください" })}
          style={{ ...inputStyle, appearance: "none" }}
        >
          <option value="" style={{ background: "#252525" }}>-- 選択してください --</option>
          {PREFECTURES.map((p) => (
            <option key={p} value={p} style={{ background: "#252525" }}>{p}</option>
          ))}
        </select>
        {errors.prefecture && (
          <p style={{ color: "#ff6677", fontSize: 12, marginTop: 6 }}>{errors.prefecture.message as string}</p>
        )}
      </div>

      <div>
        <label style={{ display: "block", color: "#bbb", fontSize: 12, fontWeight: 500, marginBottom: 8, letterSpacing: "0.05em" }}>
          市区町村 <span style={{ color: "#ff1a2e" }}>*</span>
        </label>
        <input
          type="text"
          {...register("city", { required: "市区町村を入力してください" })}
          placeholder="例: 渋谷区"
          style={{ ...inputStyle }}
        />
        {errors.city && (
          <p style={{ color: "#ff6677", fontSize: 12, marginTop: 6 }}>{errors.city.message as string}</p>
        )}
      </div>
    </div>
  );
}
