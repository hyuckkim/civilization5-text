import { CivSQLColor, PrerenderedText } from "@/types";
import * as regexp_misc from 'regexp-misc';

export function prerenderer(sliced: (string | RegExpExecArray)[]): {text: PrerenderedText[], key: string[]} {
  let result: PrerenderedText[] = [];
  let resultkey: string[] = [];
  
  const current: PrerenderedText = {
    type: "string",
    text: "",
    option: {}
  }
  sliced.forEach( d => {
    if (typeof d === "string") {
      current.text = d;
      if (!!d) result.push(structuredClone(current));
    }
    else {
      const t = d[1];
      regexp_misc.match(t, [
        [/^NEWLINE$/, () => {
          result.push({ type: "newline", text: "", option: {} });
        }],
        [/^SPACE$/, () => {
          result.push({ type: "string", text: " ", option: {} });
        }],
        [/^TAB$/, () => {
          result.push({ type: "tab", text: "", option: {} });
        }],
        [/^ICON/, () => {
          result.push({ type: "icon", text: t, option: {} });
        }],
        [/^COLOR:/, () => {
          current.option.colorsym = t;
        }],
        [/^COLOR_/, () => {
          if (!resultkey.includes(t)) resultkey.push(t);
          current.option.colorlen = t;
        }],
        [/^ENDCOLOR$/, () => {
          delete current.option.colorlen;
          delete current.option.colorsym;
        }],
      ]);
    }
  });
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