import { NextRequest, NextResponse } from "next/server";
import { diagnosisRequestSchema } from "@/lib/schema";
import { runDiagnosis } from "@/lib/mockEngine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = diagnosisRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "入力データが不正です", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const result = runDiagnosis(parsed.data);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "診断処理に失敗しました" }, { status: 500 });
  }
}
