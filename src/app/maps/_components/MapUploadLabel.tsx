"use client";

import { ChevronDown, ChevronUp } from "lucide-react";

import { civ5saveinfo } from "@/utils/civsaveparser/parser_5";
import { MapModInfo } from "./MapModInfo";
import { ElementRef, useRef, useState } from "react";
import { CivilizationInfo } from "./CivilizationInfo";
export const MapUploadLabel = ({
  file: {
    file: f,
    ...i
  },
  opened,
  onopen,
  uploaded,
}: {
  file: (civ5saveinfo & { file: File }),
  opened?: boolean,
  onopen?: (open: boolean) => void,
  uploaded?: () => void,
}) => {
  const [mapName, setMapName] = useState("");
  const [author, setAuthor] = useState("");
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);

  const form = useRef<ElementRef<"form">>(null);
  
  const isAvailable: boolean | string =
    mapName === "" ? "맵 이름은 필수입니다." :
    author === "" ? "등록자명은 필수입니다." :
    caption === "" ? "설명은 필수입니다." :
    uploading ? "업로드 중입니다." :
    true;

  const onSubmit = () => {
    if (!form.current) return;

    const formData = new FormData(form.current);
    console.log(formData);
    formData.append("file", f);

    fetch("/api/upload", {
      body: formData,
      method: "post"
    }).then(async r => {
      uploaded?.();
      location.reload();
    });
    setUploading(true);
  };

  return (
    <div className="flex flex-col p-2 rounded-md shadow-md">
      <div className="flex justify-between items-center">
        <div className="overflow-hidden text-ellipsis text-sm py-2">{f.name}</div>
        {opened
          ? <ChevronUp className="text-gray-500" onClick={() => onopen?.(false)} role="button" />
          : <ChevronDown className="text-gray-500" onClick={() => onopen?.(true)} role="button" />
        }
      </div>
      {opened && (
        <form className="flex flex-col space-y-1" ref={form}>
          <div className="flex">
            <input name="mapName" placeholder={f.name} value={mapName} onChange={e => setMapName(e.target.value)} />
            <label className="ml-1.5" htmlFor="mapName">.Civ5Save</label>
          </div>
          <div className="flex flex-wrap">
            <label htmlFor="author" className="mr-1.5">등록자</label>
            <input name="author" placeholder="ㅇㅇ" value={author} onChange={e => setAuthor(e.target.value)} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="caption" className="mr-1.5">설명</label>
            <textarea name="caption" className="bg-gray-50 p-1 text-sm"  value={caption} onChange={e => setCaption(e.target.value)} />
          </div>
          <CivilizationInfo i={i}/>
          <MapModInfo dlcs={i.dlcs} mods={i.mods}/>
          <div className="flex justify-end group relative">
            <input
              type="button"
              role="button"
              value="업로드"
              onClick={onSubmit}
              disabled={typeof(isAvailable) === "string"}
              className="bg-cyan-300 disabled:opacity-50 rounded-md px-2 py-1" />
            {typeof(isAvailable) === "string" && (
              <div className="absolute hidden group-hover:block bottom-8 bg-white shadow-md p-2 text-sm">
                {isAvailable}
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  )
}