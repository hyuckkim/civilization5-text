'use client'

import react, { useEffect, useMemo, useState } from 'react';
import Civ5renderedTextBlock from './Civ5RenderedTextBlock';

export type CivSQLColor = {Red: number, Green: number, Blue: number, Alpha: number};
export type CivColors = { [type: string] : CivSQLColor};
export type Civ5RenderedTextProp = {
    str: string,
}
export type PrerenderedText = {
    type: "string" | "icon" | "newline",
    text: string
    option: { [data: string]: string }
}

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

function prerenderer(sliced: string[]): {text: PrerenderedText[], key: string[]} {
    let result: PrerenderedText[] = [];
    let resultkey: string[] = [];

    const current: PrerenderedText = {
        type: "string",
        text: "",
        option: {}
    }

    let isMarkup = false;
    for (let s in sliced) {
        const t = sliced[s];
        if (!isMarkup) {
            current.text = t;
            result.push(structuredClone(current));
        }
        else {
            if (t === "NEWLINE") {
                result.push({ type: "newline", text: "", option: {} });
            }
            else if (t === "SPACE") {
                result.push({ type: "string", text: " ", option: {} });
            }
            else if (t === "TAB") {
                result.push({ type: "string", text: "\t", option: {} });
            }
            else if (t.startsWith("ICON")) {
                result.push({ type: "icon", text: t, option: {} });
            }
            else if (t.startsWith("COLOR:")) {
                current.option.colorsym = t;
            }
            else if (t.startsWith("COLOR_")) {
                if (!resultkey.includes(t)) resultkey.push(t);
                current.option.colorlen = t;
            }
            else if (t === "ENDCOLOR") {
                delete current.option.colorlen;
                delete current.option.colorsym;
            }
        }
        isMarkup = !isMarkup;
    }
    return {text: result, key: resultkey};
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