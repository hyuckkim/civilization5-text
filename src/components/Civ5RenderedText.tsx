/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import react, { useEffect, useState } from 'react';

type CivSQLColor = {Red: number, Green: number, Blue: number, Alpha: number};
type CivColors = { [type: string] : CivSQLColor};

export type Civ5RenderedTextProp = {
    text: string
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
                k => axios.get(`http://localhost:3000/api/color/${k}`))
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
            prerendered.map((e, idx) => {
                let color = "#ffffff";
                if (e.option.colorlen) {
                    const colordat = colors[e.option.colorlen];
                    if (colordat !== undefined)
                        color = compileCivSQLColor(colordat);
                }
                if (e.option.colorsym) {
                    color = compileFourColor(e.option.colorsym);
                }
                return (e.type === "string") 
                ? <span style={{color: color, fontSize: 14}} key={idx}>{e.text}</span>
                : (e.type === "icon")
                ? <img src={`/api/icon/${e.text}`} alt="" key={idx}/>
                : (e.type === "newline") 
                ? <br key={idx} />
                : <div key={idx} />
            })
        }</div>
    );
}

type PrerenderedText = {
    type: "string" | "icon" | "newline",
    text: string
    option: { [data: string]: string }
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

function compileCivSQLColor({Red, Green, Blue, Alpha}: CivSQLColor): string {
    const red = Math.round(Red * 255).toString(16).padStart(2, '0');
    const green = Math.round(Green * 255).toString(16).padStart(2, '0');
    const blue = Math.round(Blue * 255).toString(16).padStart(2, '0');
    const alpha = Math.round(Alpha * 255).toString(16).padStart(2, '0');
    return `#${red}${green}${blue}${alpha}`;
}

function compileFourColor(text: string): string {
    return text.replace(/COLOR:(\d{1,3}):(\d{1,3}):(\d{1,3}):(\d{1,3})/g, (_match, r, g, b, a) => {
        const red = parseInt(r).toString(16).padStart(2, "0");
        const green = parseInt(g).toString(16).padStart(2, "0");
        const blue = parseInt(b).toString(16).padStart(2, "0");
        const alpha = parseInt(a).toString(16).padStart(2, "0");
        return `#${red}${green}${blue}${alpha}`;
    });
}

/*
                axios.get(`http://localhost:3000/api/color/${t}`).then( v => {
                    newColorKeyCallback(t, v.data);
                });
*/