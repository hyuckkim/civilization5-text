"use client";

import { useState } from "react";
import { MapUploadButton } from "./MapUploadButton";
import { MapUploadLabel } from "./MapUploadLabel";

import { civ5saveinfo, parse as parser_5 } from "@/utils/civsaveparser/parser_5";

export const MapUploadMenu = () => {
  const [files, setFiles] = useState<(civ5saveinfo & { file: File })[]>([]);
  const [openedFile, setOpenedFile] = useState<string | undefined>(undefined);
  
  const onMapUpload = async (files: File[]) => {
    const promises = files.map((file) => parse(file));
    Promise.all(promises)
      .then(v => {
        setFiles(prev => [...prev, ...v]);
        if (openedFile === undefined) {
          setOpenedFile(v[0].file.name);
        }
      });
  };

  return (
    <div className="flex flex-col space-y-2">
      <MapUploadButton onMapUpload={onMapUpload}/>
      {files.map(v => (
        <MapUploadLabel key={v.file.name}
          file={v}
          opened={openedFile === v.file.name}
          onopen={(open) => setOpenedFile(open ? v.file.name : undefined)}
          uploaded={() => setFiles(files.filter(f => f !== v))} />
      ))}
    </div>
  )
}

async function parse(file: File): Promise<(civ5saveinfo & { file: File })> {
  const arrayBuffer = await file.arrayBuffer();
  const nodeBuffer = Buffer.from(arrayBuffer);
  const result = parser_5(nodeBuffer);

  console.log(result);
  return {
    ...result,
    file: file
  };
}