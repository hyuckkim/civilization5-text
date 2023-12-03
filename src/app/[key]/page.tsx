import React from 'react';
import { getText } from '@/db';
import { Civ5RenderedText_Server } from '@/components/Civ5RenderedText_Server';

type Router = {
    params: { key: string }
}
export default async function Title({ params }: Router) {
    const text = getText(params.key, "Language_ko_KR");
    return (
        <div className='m-28'>
            <h3>{text.Tag ?? ""}</h3>
            <textarea defaultValue={text.Text ?? ""} className='resize w-full h-48 border-gray-200 border-2'/>
            <Civ5RenderedText_Server str={text.Text} />
        </div>
    )
}