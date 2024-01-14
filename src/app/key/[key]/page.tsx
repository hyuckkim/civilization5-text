import React from 'react';
import { getText } from '@/db';
import Civ5RenderedText_Server from '@/components/Civ5RenderedText_Server';
import { Base64 } from 'js-base64';
import { CopyPublishLinkButton } from '@/components/CopyPublishLinkButton';
import { CopyPublishKeyButton } from '@/components/CopyPublishKeyButton';

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
            <CopyPublishLinkButton binary={Base64.encode(text.Text, true)} className="border-2 border-black rounded-md m-2 px-4 py-2"/>
            <CopyPublishKeyButton binary={text.Tag} className="border-2 border-black rounded-md m-2 px-4 py-2"/>
        </div>
    )
}