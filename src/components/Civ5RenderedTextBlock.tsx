import { CivColors, PrerenderedText } from "@/types";
import { compileCivSQLColor, compileFourColor } from "@/utils";
import Image from "next/image";

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
            return <Image src={`/api/icon/${text.text}`} alt={`[${text.text}]`} width={22} height={22} />
        case "newline":
            return <br />
        case "tab":
            return <>&#0009;</>
    }
}
