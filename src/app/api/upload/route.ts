import { kv } from "@vercel/kv";
import { put } from "@vercel/blob";

import { NextRequest, NextResponse } from "next/server";
import { Civ5Map } from "@/types";
import { civ5saveinfo, parse as parser_5 } from "@/utils/civsaveparser/parser_5";
import { revalidatePath } from "next/cache";


export async function POST(request: NextRequest) {
  const data = await request.formData();

  const length = await kv.get<number>("length") ?? 0;
  await kv.set("length", length + 1);

  const maps = await kv.get<(Civ5Map & civ5saveinfo)[]>('maps') ?? [];

  const file = data.get("file");
  if (!(file instanceof File)) return NextResponse.error(); 
  const blob = await put(uuidv4(), file, {
    access: 'public',
  });

  const parsed = parser_5(Buffer.from(await file.arrayBuffer()));  

  const newMap: (Civ5Map & civ5saveinfo) = {
    mapName: toOnlyString(data.get("mapName")),
    author: toOnlyString(data.get("author")),
    caption: toOnlyString(data.get("caption")),
    file: blob.url,
    ...parsed,
  };

  await kv.set("maps", [...maps, newMap]);

  revalidatePath("/maps");
  return NextResponse.json(newMap);
}

const toOnlyString = (data: any): string => {
  return typeof data === "string" ? data : "";
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  .replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, 
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}