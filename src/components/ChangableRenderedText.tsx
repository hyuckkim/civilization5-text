'use client'

import { useState } from "react";
import Civ5RenderedText from "./Civ5RenderedText";
import { CopyPublishLinkButton } from '@/components/CopyPublishLinkButton';
import { Base64 } from "js-base64";

export default function ChangableRenderedText({text}: {text: string}) {
  const [str, setStr] = useState(text);
  const [brackets, setBrackets] = useState<string[][]>([]);
  
  return <>
    <textarea value={str} onChange={(e) => setStr(e.target.value)} className='w-full h-48 border-gray-200 border-2 box-border'/>
    <Civ5RenderedText str={str} brackets={brackets.map(b => b[1])} onFoundBrackets={(b) => {setBrackets(b.map(b => [b, b])); }}/>
    <CopyPublishLinkButton binary={Base64.encode(str, true)} className="border-2 border-black rounded-md m-2 px-4 py-2"/>
    {brackets.map((b, i) => (
      <div key={i} className="w-2xl flex justify-between mb-0.5">
        {b[0]}
        <input value={b[1]} className="bg-neutral-200 w-96" onChange={(e) => setBrackets(prev =>
          prev.map((b, j) => (i === j) ? [b[0], e.target.value] : b))} />
      </div>
    ))}
  </>
}