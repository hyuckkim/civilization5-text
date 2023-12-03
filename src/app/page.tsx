import React from 'react';
import { Civ5TextPanel } from '@/components';
import { getRandomText } from '@/db';
import { Civ5RenderedText } from '@/components/Civ5RenderedText';

export default async function Title() {
    const text = getRandomText("Language_ko_KR");
    return (
        <div className='m-28'>
            <h3>{text.Tag ?? ""}</h3>
            <textarea defaultValue={text.Text ?? ""} className='resize w-full h-48 border-gray-200 border-2'/>
            <Civ5RenderedText str={text.Text} />
        </div>
    )
}