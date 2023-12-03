'use client'

import react, { useEffect, useState } from 'react';
import Civ5renderedTextBlock from './Civ5RenderedTextBlock';
import { Civ5RenderedTextProp, CivColors, CivSQLColor, PrerenderedText } from '@/types';
import { prerenderer } from '@/utils';

export default function Civ5RenderedText({ str }: Civ5RenderedTextProp) {
    const [renderingText, setRenderingText] = useState<PrerenderedText[]>([]);
    const [textKey, setTextKey] = useState<string[]>([]);
    const [colors, setColors] = useState<CivColors>({});
    
    useEffect(() => {
        const sliced = str.split(/[\[\]]/);
        const {text, key} = prerenderer(sliced);

        setRenderingText(text);
        setTextKey(key);
    }, [str]);

    useEffect(() => {
        patchColorData(textKey).then(v => {
            setColors(v);
        })
    }, [textKey]);
    
    return (
        <div className='bg-black rounded-md p-2 border border-l-white max-w-xl'>{
            renderingText.map((e, idx) => <Civ5renderedTextBlock text={e} colors={colors} key={idx} />)
        }
        </div>
    );
}

async function patchColorData(key: string[]): Promise<CivColors> {
    const dat = await Promise.all(key.map(d => getColorData(d)));

    return dat.reduce((prev: CivColors, curr: CivSQLColor, idx) => {
        return {...prev, [key[idx]]: curr};
    }, {});
}
async function getColorData(color: string): Promise<CivSQLColor> {
    const work = await fetch(new URL(`/api/color/${color}`, document.location.origin));
    return await work.json()
}