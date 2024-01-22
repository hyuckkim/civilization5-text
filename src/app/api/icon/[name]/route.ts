import { getIconFilePath } from "@/db";
import { getIconImageBuffer } from "@/image";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { name: string}}) {
  if (params.name.match(/[^A-Z_0-9]/g)) {
    return NextResponse.json({ error: 'invalid icon'}, { status: 404});
  }
  try {
    const { file, offset } = getIconFilePath(params.name);
    const result: Uint8Array = await getIconImageBuffer(file, offset);
    return new NextResponse(result)
  }
  catch {
    return NextResponse.json({ error: 'invalid icon'}, { status: 404});
  }
}
