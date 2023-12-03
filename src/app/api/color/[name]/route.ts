import { getColor } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest, { params }: { params: { name: string}}) {
  if (params.name.match(/[^A-Z_0-9]/g)) {
    return NextResponse.json({ error: 'invalid color'}, { status: 404});
  }
  try {
    const data = getColor(params.name);
    return NextResponse.json(data);
  }
  catch {
    return NextResponse.json({ error: 'invalid color'}, { status: 404});
  }
}