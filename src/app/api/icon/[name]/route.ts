import { getIconFilePath } from "@/db";
import { getIconImageBuffer } from "@/image";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { name: string}}) {
  if (params.name.match(/[^A-Z_0-9]/g)) {
    throw new Error('지정되지 않은 문자열');
  }
  
  const { file, offset } = getIconFilePath(params.name);
  const result: Uint8Array = await getIconImageBuffer(file, offset);
  
  return new NextResponse(result)
}