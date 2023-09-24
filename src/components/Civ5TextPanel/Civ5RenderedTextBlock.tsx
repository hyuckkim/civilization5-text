/* eslint-disable @next/next/no-img-element */
import { CivColors, CivSQLColor, PrerenderedText } from "./Civ5RenderedText"

type Civ5renderedTextBlockProp = {
    text: PrerenderedText,
    colors: CivColors,
}

export default function Civ5renderedTextBlock(prop: Civ5renderedTextBlockProp) {
    let color = "#ffffff";
    if (prop.text.option.colorlen) {
        const colordat = prop.colors[prop.text.option.colorlen];
        if (colordat !== undefined)
            color = compileCivSQLColor(colordat);
    }
    if (prop.text.option.colorsym) {
        color = compileFourColor(prop.text.option.colorsym);
    }

    switch (prop.text.type) {
        case "string":
            return <span style={{color: color, fontSize: 14}}>{prop.text.text}</span>;
        case "icon":
            return <img src={`/api/icon/${prop.text.text}`} alt="" />
        case "newline":
            return <br />
        default:
            return <></>
    }
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