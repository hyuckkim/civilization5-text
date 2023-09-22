import { Civ5Text } from '@/types';
import react from 'react';
import Civ5RenderedText from './Civ5RenderedText';

export type Civ5TextPanelProp = {
    text: Civ5Text
}
export default function Civ5TextPanel(prop: Civ5TextPanelProp) {
    return (
        <div>
            <div>{prop.text.Tag ?? ""}</div>
            <textarea defaultValue={prop.text.Text ?? ""} style={{resize: 'both'}}/>
            <Civ5RenderedText text={prop.text.Text}/>
        </div>
    )
}