import React from 'react';
import { Civ5TextPanel } from '@/components';
import { getText } from '@/db';

type Router = {
    params: { key: string }
}
export default async function Title({ params }: Router) {
    const text = getText(params.key, "Language_ko_KR");
    return (
        <div className='m-28'>
            <Civ5TextPanel text={text}/>
        </div>
    )
}