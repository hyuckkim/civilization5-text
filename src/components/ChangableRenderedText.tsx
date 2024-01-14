'use client'

import { useState } from "react";
import Civ5RenderedText from "./Civ5RenderedText";
import { CopyPublishLinkButton } from '@/components/CopyPublishLinkButton';
import { encodeUnicodeToBase64 } from "@/utils";

export default function ChangableRenderedText({text}: {text: string}) {
  const [str, setStr] = useState(text);
  return <>
    <textarea value={str} onChange={(e) => setStr(e.target.value)} className='w-full h-48 border-gray-200 border-2 box-border'/>
    <Civ5RenderedText str={str} />
    <CopyPublishLinkButton binary={encodeUnicodeToBase64(str)} className="border-2 border-black rounded-md m-2 px-4 py-2"/>
  </>
}