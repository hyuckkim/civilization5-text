import { kv } from "@vercel/kv";
import { MapUploadMenu } from "./_components/MapUploadMenu";
import { MapDownloadMenu } from "./_components/MapDownloadMenu";
import { Civ5Map } from "@/types";
import { civ5saveinfo } from "@/utils/civsaveparser/parser_5";

export default async function Page() {
  const length = await kv.get<number>("length") ?? 0;
  const maps = await kv.get<(Civ5Map & civ5saveinfo)[]>("maps");
  return (
    <div className="min-h-full flex flex-col m-2 space-x-2">
      <div className="flex flex-col items-center justify-center pt-10">
        maps: {length}
      </div>
      <div className="flex space-x-4">
        <MapUploadMenu />
        <MapDownloadMenu maps={maps ?? undefined}/>
      </div>
    </div>
  )
}