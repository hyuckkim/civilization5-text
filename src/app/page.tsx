import React from 'react';
import { Civ5TextPanel } from '@/components';
import { getRandomText } from '@/db';

export default async function Title() {
    const text = getRandomText("Language_ko_KR");
    return (
        <div className='m-28'>
            <Civ5TextPanel text={text}/>
        </div>
    )
}