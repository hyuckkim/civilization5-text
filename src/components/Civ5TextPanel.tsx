import { Civ5Text } from '@/types';
import react from 'react';

export type Civ5TextPanelProp = {
    text: Civ5Text
}
export default function Civ5TextPanel(prop: Civ5TextPanelProp) {
    return (
        <div>
            <div>{prop.text.Tag ?? ""}</div>
            <textarea defaultValue={prop.text.Text ?? ""}/>
        </div>
    )
}