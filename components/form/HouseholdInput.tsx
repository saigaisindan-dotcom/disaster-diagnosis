import type { UseFormRegister, UseFormWatch, UseFormSetValue, FieldErrors } from "react-hook-form";

const SH1 = "#111";
const SH2 = "#2b2b2b";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch: UseFormWatch<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: FieldErrors<any>;
  housingType: "apartment" | "house";
}

export default function HouseholdInput({ register, watch, setValue, errors, housingType }: Props) {
  const familySize = watch("familySize") as number;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* 家族人数 */}
      <div>
        <label style={{ display: "block", color: "#bbb", fontSize: 12, fontWeight: 500, marginBottom: 12, letterSpacing: "0.05em" }}>
          家族人数
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            type="button"
            onClick={() => setValue("familySize", Math.max(1, familySize - 1))}
            style={{
              width: 44, height: 44,
              boxShadow: `5px 5px 10px ${SH1}, -3px -3px 8px ${SH2}`,
              borderRadius: 10,
              border: "none",
              background: "#1e1e1e",
              color: "#888",
              fontSize: 20,
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            −
          </button>
          <span style={{ color: "#e8e8e8", fontSize: 20, fontWeight: 700, minWidth: 60, textAlign: "center" }}>
            {familySize}<span style={{ fontSize: 13, color: "#888", marginLeft: 2 }}>人</span>
          </span>
          <button
            type="button"
            onClick={() => setValue("familySize", Math.min(20, familySize + 1))}
            style={{
              width: 44, height: 44,
              boxShadow: `5px 5px 10px ${SH1}, -3px -3px 8px ${SH2}`,
              borderRadius: 10,
              border: "none",
              background: "#1e1e1e",
              color: "#ff1a2e",
              fontSize: 20,
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            ＋
          </button>
        </div>
      </div>

      {/* 住宅タイプ */}
      <div>
        <label style={{ display: "block", color: "#bbb", fontSize: 12, fontWeight: 500, marginBottom: 12, letterSpacing: "0.05em" }}>
          住宅タイプ
        </label>
        <div style={{ display: "flex", gap: 12 }}>
          {[
            { value: "apartment", label: "マンション・集合住宅" },
            { value: "house", label: "一戸建て" },
          ].map(({ value, label }) => {
            const isSelected = housingType === value;
            return (
              <label
                key={value}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "12px 16px",
                  borderRadius: 10,
                  cursor: "pointer",
                  border: isSelected ? "1px solid rgba(255,26,46,0.4)" : "1px solid rgba(255,255,255,0.06)",
                  background: isSelected ? "rgba(255,26,46,0.08)" : "transparent",
                  transition: "all 0.2s",
                }}
              >
                <input
                  type="radio"
                  value={value}
                  {...register("housingType")}
                  style={{ accentColor: "#ff1a2e", width: 16, height: 16 }}
                />
                <span style={{ color: isSelected ? "#e8e8e8" : "#888", fontSize: 13, fontWeight: isSelected ? 700 : 400 }}>
                  {label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 階数 */}
      {housingType === "apartment" && (
        <div>
          <label style={{ display: "block", color: "#bbb", fontSize: 12, fontWeight: 500, marginBottom: 8, letterSpacing: "0.05em" }}>
            居住階数
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input
              type="number"
              {...register("floorNumber", { min: 1, max: 100, valueAsNumber: true })}
              min={1}
              max={100}
              style={{
                width: 88,
                background: "#252525",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8,
                padding: "12px 14px",
                color: "#e8e8e8",
                fontSize: 14,
                outline: "none",
              }}
            />
            <span style={{ color: "#888", fontSize: 13 }}>階</span>
          </div>
          {errors.floorNumber && (
            <p style={{ color: "#ff6677", fontSize: 12, marginTop: 6 }}>1〜100階の範囲で入力してください</p>
          )}
        </div>
      )}
    </div>
  );
}
