import axios from 'axios';
import react, { useEffect, useState } from 'react';
import Civ5renderedTextBlock from './Civ5RenderedTextBlock';

export type CivSQLColor = {Red: number, Green: number, Blue: number, Alpha: number};
export type CivColors = { [type: string] : CivSQLColor};
export type Civ5RenderedTextProp = {
    text: string
}
export type PrerenderedText = {
    type: "string" | "icon" | "newline",
    text: string
    option: { [data: string]: string }
}

export default function Civ5RenderedText(prop: Civ5RenderedTextProp) {
    const [prerendered, setPrerendered] = useState([] as PrerenderedText[]);
    const [colors, setColors] = useState({} as CivColors);

    useEffect(() => {
        const sliced = prop.text.split(/[\[\]]/);
        const {text, key} = prerenderer(sliced);
        const keyValue: CivColors = Object.create({});
        setPrerendered(text);

        axios.all(
            key.map(
                k => axios.get(`${document.location.origin}/api/color/${k}`))
        ).then(reses => {
            reses.forEach(v => {
                const urlparts = v.config.url?.split('/') || [];
                const k = urlparts[urlparts.length - 1];

                keyValue[k] = v.data;
            });
            setColors(keyValue);
        });
    }, [prop.text]);

    return (
        <div style={{backgroundColor: 'black'}}>{
            prerendered.map((e, idx) => <Civ5renderedTextBlock text={e} colors={colors} key={idx} />)
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