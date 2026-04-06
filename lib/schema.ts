import { z } from "zod";

export const diagnosisRequestSchema = z.object({
  address: z.object({
    prefecture: z.string().min(1, "都道府県を選択してください"),
    city: z.string().min(1, "市区町村を入力してください"),
  }),
  household: z.object({
    size: z.number().int().min(1).max(20),
    housingType: z.enum(["apartment", "house"]),
    floorNumber: z.number().int().min(1).max(100).optional(),
  }),
  currentStockpile: z.object({
    waterLiters: z.number().min(0).max(500),
    foodDays: z.number().min(0).max(365),
  }),
});

export type DiagnosisRequestSchema = z.infer<typeof diagnosisRequestSchema>;
