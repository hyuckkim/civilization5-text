import React from 'react';
import { getText } from '@/db';
import Civ5RenderedText_Server from '@/components/Civ5RenderedText_Server';

type Router = {
    params: { key: string }
}
export default async function Title({ params }: Router) {
    const text = getText(params.key, "Language_ko_KR");
    return (
        <div className='mx-auto m-0 max-w-2xl'>
            <h3 className='pt-[112px]'>{text.Tag ?? ""}</h3>
            <textarea defaultValue={text.Text ?? ""} disabled className='w-full resize-y bg-gray-300 h-48 border-gray-200 border-2'/>
            <Civ5RenderedText_Server str={text.Text} />
        </div>
    )
}