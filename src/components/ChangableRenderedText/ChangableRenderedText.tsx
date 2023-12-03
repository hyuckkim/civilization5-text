'use client'

import { useState } from "react";
import { Civ5RenderedText } from "../Civ5RenderedText";

export default function ChangableRenderedText({text}: {text: string}) {
  const [str, setStr] = useState(text);
  return <>
    <textarea value={str} onChange={(e) => setStr(e.target.value)} className='resize w-full h-48 border-gray-200 border-2'/>
    <Civ5RenderedText str={str} />
  </>
}