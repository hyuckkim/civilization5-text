import Image from "next/image";
import { CivColors, CivSQLColor, PrerenderedText } from "./Civ5RenderedText"

type Civ5renderedTextBlockProp = {
    text: PrerenderedText,
    colors: CivColors,
}

export default function Civ5renderedTextBlock({ text, colors }: Civ5renderedTextBlockProp) {
    let color = "#ffffff";
    if (!!text.option.colorlen) {
        const colordat = colors[text.option.colorlen];
        if (colordat !== undefined)
            color = compileCivSQLColor(colordat);
    }
    if (!!text.option.colorsym) {
        color = compileFourColor(text.option.colorsym);
    }

    switch (text.type) {
        case "string":
            return <span style={ color !== "#ffffff" ? {color: color} : {}} className="text-sm text-white">{text.text}</span>;
        case "icon":
            return <Image src={`/api/icon/${text.text}`} alt="" width={22} height={22} />
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