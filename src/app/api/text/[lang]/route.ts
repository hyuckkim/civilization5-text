import { getColor, getRandomText, } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest, { params }: { params: { lang: string}}) {
  try {
    const data = getRandomText(params.lang);
    return NextResponse.json(data);
  }
  catch {
    return NextResponse.json({ error: 'invalid text'}, { status: 404});
  }
}