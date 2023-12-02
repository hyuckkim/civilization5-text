'use client'
import { Civ5Text } from '@/types';
import react from 'react';
import Civ5RenderedText from './Civ5RenderedText';

export type Civ5TextPanelProp = {
    text: Civ5Text
}
export default function Civ5TextPanel(prop: Civ5TextPanelProp) {
    return (
        <div>
            <h3>{prop.text.Tag ?? ""}</h3>
            <textarea defaultValue={prop.text.Text ?? ""} className='resize w-full h-48 border-gray-200 border-2'/>
            <Civ5RenderedText text={prop.text.Text} onTextRendered={(t) => { console.log(t)}}/>
        </div>
    )
}