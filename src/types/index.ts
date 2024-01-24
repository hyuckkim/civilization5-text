export type Civ5Text = {
    Tag: string,
    Text: string,
    plural: number | null,
    gender: number | null,
}

export type CivSQLColor = {Red: number, Green: number, Blue: number, Alpha: number};
export type CivColors = { [type: string] : CivSQLColor};
export type Civ5RenderedTextProp = {
    str: string,
}
export type PrerenderedText = {
    type: "string" | "icon" | "newline" | "tab" | "bracket",
    text: string
    option: { [data: string]: string }
}