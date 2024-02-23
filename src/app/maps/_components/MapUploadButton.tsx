"use client";

import { ChangeEvent } from "react";

export const MapUploadButton = ({
  onMapUpload,
}: {
  onMapUpload: (files: File[]) => unknown,
}) => {
  const handleMapUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray: File[] = [];

    for (let i = 0; i < files.length; i++) {
      fileArray.push(files[i]);
    }

    onMapUpload(fileArray);
  };

  return (
    <form>
      <label htmlFor="uploadMap" className="w-80 h-60 bg-gray-200 p-2 flex items-center justify-center rounded-md" role="button"
      style={{
        backgroundImage: "url('/_ingame.png')",
      }}>
        <input type="file"
          className="hidden"
          id="uploadMap"
          accept=".Civ5Save,.CivBESave,.Civ6Save"
          multiple
          onChange={handleMapUpload}
        />
        <div className="text-2xl text-white">맵 업로드하기</div>
      </label>
    </form>
    );
}