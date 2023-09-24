import { Civ5Text } from '@/types';
import react, { useRef } from 'react';
import Civ5RenderedText from './Civ5RenderedText';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';

export type Civ5TextPanelProp = {
    text: Civ5Text
}
export default function Civ5TextPanel(prop: Civ5TextPanelProp) {
    return (
        <div>
            <h3>{prop.text.Tag ?? ""}</h3>
            <textarea defaultValue={prop.text.Text ?? ""} className='resize w-96 h-48 border-gray-200 border-2'/>
            <Civ5RenderedText text={prop.text.Text} onTextRendered={(t) => { console.log(t)}}/>
        </div>
    )
}