import { CivSQLColor, PrerenderedText } from "@/types";

export function prerenderer(sliced: string[]): {text: PrerenderedText[], key: string[]} {
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
      if (!!t) result.push(structuredClone(current));
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

export function compileCivSQLColor({Red, Green, Blue, Alpha}: CivSQLColor): string {
  const red = Math.round(Red * 255).toString(16).padStart(2, '0');
  const green = Math.round(Green * 255).toString(16).padStart(2, '0');
  const blue = Math.round(Blue * 255).toString(16).padStart(2, '0');
  const alpha = Math.round(Alpha * 255).toString(16).padStart(2, '0');
  return `#${red}${green}${blue}${alpha}`;
}

export function compileFourColor(text: string): string {
  return text.replace(/COLOR:(\d{1,3}):(\d{1,3}):(\d{1,3}):(\d{1,3})/g, (_match, r, g, b, a) => {
    const red = parseInt(r).toString(16).padStart(2, "0");
    const green = parseInt(g).toString(16).padStart(2, "0");
    const blue = parseInt(b).toString(16).padStart(2, "0");
    const alpha = parseInt(a).toString(16).padStart(2, "0");
    return `#${red}${green}${blue}${alpha}`;
  });
}