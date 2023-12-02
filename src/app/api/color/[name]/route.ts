import { getColor } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest, { params }: { params: { name: string}}) {
  if (params.name.match(/[^A-Z_0-9]/g)) {
    throw new Error('지정되지 않은 문자열');
  }
  const data = getColor(params.name);
  return NextResponse.json(data);
}