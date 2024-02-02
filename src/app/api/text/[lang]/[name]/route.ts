import { getColor, getText } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest, { params }: { params: { lang: string, name: string}}) {
  if (params.name.match(/[^A-Z_0-9]/g)) {
    return NextResponse.json({ error: 'invalid text'}, { status: 404});
  }
  try {
    const data = getText(params.name, params.lang);
    return NextResponse.json(data);
  }
  catch {
    return NextResponse.json({ error: 'invalid text'}, { status: 404});
  }
}