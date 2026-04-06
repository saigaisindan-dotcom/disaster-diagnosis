export type HousingType = "apartment" | "house";

export interface DiagnosisRequest {
  address: {
    prefecture: string;
    city: string;
  };
  household: {
    size: number;
    housingType: HousingType;
    floorNumber?: number;
  };
  currentStockpile: {
    waterLiters: number;
    foodDays: number;
  };
}

export interface RiskScores {
  earthquake: number;
  tsunami: number;
  ash: number;
}

export interface LifelineDisruption {
  powerDays: number;
  waterDays: number;
  foodDelayDays: number;
  toiletIssueDays: number;
}

export type ProductCategory = "water" | "food" | "toilet" | "battery";

export interface SetItem {
  id: string;
  category: ProductCategory;
  name: string;
  count: number;
  url: string;
  price: number;
  quantity: number;
  unit: string;
}

export interface ShoppingSet {
  total_price: number;
  items: SetItem[];
}

export interface DiagnosisResponse {
  summary: { message: string };
  risk: RiskScores;
  lifeline: LifelineDisruption;
  set: ShoppingSet;
}
