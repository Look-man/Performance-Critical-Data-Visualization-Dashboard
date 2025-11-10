import { NextResponse } from "next/server";
import { generateDataPoint } from "@/lib/datGenerator";

export async function GET() {
  const points = Array.from({ length: 10000 }, (_, i) => generateDataPoint(i));
  return NextResponse.json(points);
}
