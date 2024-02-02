import { CivColors, PrerenderedText } from "@/types";
import { compileCivSQLColor, compileFourColor } from "@/utils";
import Image from "next/image";

type Civ5renderedTextBlockProp = {
    text: PrerenderedText,
    colors: CivColors,
    brackets: string[],
}

export default function Civ5renderedTextBlock({ text, colors, brackets }: Civ5renderedTextBlockProp) {
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
            return <span style={ color !== "#ffffff" ? {color: color} : {}} className="text-sm text-white">{text.text}</span>
        case "icon":
            return <Image src={`/api/icon/${text.text}`} alt={`[${text.text}]`} width={22} height={22} onClick={() => navigator.clipboard.writeText(`[${text.text}]`)}/>
        case "newline":
            return <><span style={{fontSize: 0, opacity: 0}}>[NEWLINE]</span><br /></>
        case "tab":
            return <>&#0009;</>
        case "bracket":
            return <span style={ color !== "#ffffff" ? {color: color} : {}} className="text-sm text-white">{brackets[Number.parseInt(text.text)]}</span>
    }
}
