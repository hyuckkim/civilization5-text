'use client'

import react, { useEffect, useState } from 'react';
import { Civ5RenderedTextBlock } from '../Civ5RenderedTextBlock';
import { Civ5RenderedTextProp, CivColors, CivSQLColor, PrerenderedText } from '@/types';
import { prerenderer } from '@/utils';
import * as regexp_misc from 'regexp-misc';

export default function Civ5RenderedText({ str }: Civ5RenderedTextProp) {
    const [renderingText, setRenderingText] = useState<PrerenderedText[]>([]);
    const [textKey, setTextKey] = useState<string[]>([]);
    const [colors, setColors] = useState<CivColors>({});
    
    useEffect(() => {
        const sliced = regexp_misc.separate(str, /\[(.+?)\]/g);
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
            isTextCorrect(str) 
            ? renderingText.map((e, idx) => <Civ5RenderedTextBlock text={e} colors={colors} key={idx} />)
            : <span className='text-sm text-white'>텍스트에 오류가 있습니다 (괄호가 닫히지 않았음)</span>
        }
        </div>
    );
}

async function patchColorData(key: string[]): Promise<CivColors> {
    try {
        const dat = await Promise.all(key.map(d => getColorData(d)));
    
        return dat.reduce((prev: CivColors, curr: CivSQLColor, idx) => {
            return {...prev, [key[idx]]: curr};
        }, {});
    }
    catch {
        throw new Error('유효하지 않은 색이 있습니다.');
    }
}
async function getColorData(color: string): Promise<CivSQLColor> {
    const work = await fetch(new URL(`/api/color/${color}`, document.location.origin));
    return await work.json()
}

function isTextCorrect(text: string): boolean {
    const left = text.split('[').length - 1;
    const right = text.split(']').length - 1;
    return left === right;
}