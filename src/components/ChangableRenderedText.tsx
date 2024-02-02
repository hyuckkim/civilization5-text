'use client'

import { useState } from "react";
import Civ5RenderedText from "./Civ5RenderedText";
import { CopyPublishLinkButton } from '@/components/CopyPublishLinkButton';
import { Base64 } from "js-base64";

export default function ChangableRenderedText({text}: {text: string}) {
  const [str, setStr] = useState(text);
  const [brackets, setBrackets] = useState<string[][]>([]);

  const loadText = (idx: number) => {
    const key = brackets[idx][0].replace(/[{}]/g, "");
    fetch(new URL(`/api/text/Language_ko_KR/${key}`, document.location.origin))
      .then(async (value) => {
        const text = await value.json();
        setBrackets(prev => prev.map((v, i) => i === idx ? [v[0], text.Text] : v));
      });
  }
  
  return <>
    <textarea value={str} onChange={(e) => setStr(e.target.value)} className='w-full h-48 border-gray-200 border-2 box-border'/>
    <Civ5RenderedText str={str} brackets={brackets.map(b => b[1])} onFoundBrackets={(b) => {setBrackets(b.map(b => [b, b])); }}/>
    <CopyPublishLinkButton binary={Base64.encode(str, true)} className="border-2 border-black rounded-md m-2 px-4 py-2"/>
    {brackets.map((b, i) => (
      <div key={i} className="w-2xl flex justify-between mb-0.5">
        <input className="w-1/2 text-sm overflow-hidden text-ellipsis" title={b[0]} onClick={() => loadText(i)} value={b[0]} />
        <input value={b[1]} className="bg-neutral-200 w-1/2" onChange={(e) => setBrackets(prev =>
          prev.map((b, j) => (i === j) ? [b[0], e.target.value] : b))} />
      </div>
    ))}
  </>
}