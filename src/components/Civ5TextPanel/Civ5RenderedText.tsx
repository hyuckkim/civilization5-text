import react from 'react';
import Civ5renderedTextBlock from './Civ5RenderedTextBlock';
import { getColor } from '@/db';

export type CivSQLColor = {Red: number, Green: number, Blue: number, Alpha: number};
export type CivColors = { [type: string] : CivSQLColor};
export type Civ5RenderedTextProp = {
    text: string,
}
export type PrerenderedText = {
    type: "string" | "icon" | "newline",
    text: string
    option: { [data: string]: string }
}

export default async function Civ5RenderedText(prop: Civ5RenderedTextProp) {
    const sliced = prop.text.split(/[\[\]]/);
    const {text, key} = prerenderer(sliced);
    const colors = patchColorData(key);
    
    return (
        <div className='bg-black rounded-md p-2 border border-l-white max-w-xl'>{
            text.map((e, idx) => <Civ5renderedTextBlock text={e} colors={colors} key={idx} />)
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

function patchColorData(key: string[]): CivColors {
    const result: CivColors = key.reduce((prev: CivColors, curr: string) => {
        return {...prev, [curr]: getColor(curr)}
    }, {});

    return result;
}