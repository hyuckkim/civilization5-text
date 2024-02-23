"use client";

import { Civ5Map } from "@/types";
import { MapDownloadElement } from "./MapDownloadelement";
import { civ5saveinfo } from "@/utils/civsaveparser/parser_5";

export const MapDownloadMenu = ({
  maps
}: {
  maps?: (Civ5Map & civ5saveinfo)[]
}) => {
  return (
    <div className="w-full h-full grid grid-cols-4 gap-4">
      {maps?.map(m => (
        <MapDownloadElement key={m.file} map={m} />
      ))}
    </div>
  );
}