import type { UseFormRegister, UseFormWatch, UseFormSetValue } from "react-hook-form";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch: UseFormWatch<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
}

export default function StockpileInput({ register, watch }: Props) {
  const waterLiters = watch("waterLiters") as number;
  const foodDays = watch("foodDays") as number;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {/* 飲料水 */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <label style={{ color: "#bbb", fontSize: 12, fontWeight: 500, letterSpacing: "0.05em" }}>飲料水（備蓄量）</label>
          <span style={{ color: "#ff1a2e", fontSize: 20, fontWeight: 900 }}>
            {waterLiters}<span style={{ fontSize: 12, color: "#888", marginLeft: 3 }}>リットル</span>
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          {...register("waterLiters", { valueAsNumber: true })}
          style={{ width: "100%", height: 6, cursor: "pointer" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", color: "#777", fontSize: 11, marginTop: 6 }}>
          <span>0L</span>
          <span>100L</span>
        </div>
      </div>

      {/* 食料 */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <label style={{ color: "#bbb", fontSize: 12, fontWeight: 500, letterSpacing: "0.05em" }}>食料（備蓄日数）</label>
          <span style={{ color: "#ff1a2e", fontSize: 20, fontWeight: 900 }}>
            {foodDays}<span style={{ fontSize: 12, color: "#888", marginLeft: 3 }}>日分</span>
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={30}
          step={1}
          {...register("foodDays", { valueAsNumber: true })}
          style={{ width: "100%", height: 6, cursor: "pointer" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", color: "#777", fontSize: 11, marginTop: 6 }}>
          <span>0日</span>
          <span>30日</span>
        </div>
      </div>
    </div>
  );
}
