import react from 'react';

export type Civ5RenderedTextProp = {
    text: string
}
export default function Civ5RenderedText(prop: Civ5RenderedTextProp) {
    const sliced = prop.text.split(/[\[\]]/);


    return (
        <></>
    );
}

type PrerenderedText = {
    type: "string" | "icon" | "newline",
    text: string
    option: { [data: string]: string }
}
function prerenderer(): PrerenderedText[] {
    const current: PrerenderedText = {
        type: "string",
        text: "",
        option: {}
    }
    return [current];
}