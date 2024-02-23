"use client";

import { Civ5Map } from "@/types"
import { civ5saveinfo } from "@/utils/civsaveparser/parser_5";
import { MapModInfo } from "./MapModInfo";
import { CivilizationInfo } from "./CivilizationInfo";

export const MapDownloadElement = ({
  map
}: {
  map: Civ5Map & civ5saveinfo
}) => {
  const handleDownload = () => {
    fetch(map.file)
      .then(async v => {
        const blob = await v.blob();
        const a = document.createElement("a");
        const url = window.URL.createObjectURL(blob);

        a.href = url;
        a.download = `${map.mapName}.Civ5Save`;
        a.click();
        
        window.URL.revokeObjectURL(url);
      });
  };

  return (
    <div className="shadow-md rounded-md w-full h-40 p-2 flex flex-col justify-between overflow-y-auto">
      <div className="flex flex-col space-y-2">
        <div className="text-lg flex justify-between items-center">
          {map.mapName}
          <button onClick={handleDownload} className="bg-sky-300 px-2 py-1 rounded-md text-sm">다운로드</button>
        </div>
        <p>By {map.author}</p>
        <p className="text-sm bg-gray-50 p-1 rounded-sm">{map.caption}</p>
        <CivilizationInfo i={map} />
        <MapModInfo dlcs={map.dlcs} mods={map.mods} />
      </div>
    </div>
  )
}