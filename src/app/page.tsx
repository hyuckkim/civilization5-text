import React from 'react';
import { getRandomText } from '@/db';
import { ChangableRenderedText } from '@/components';

export default async function Title() {
    const text = getRandomText("Language_ko_KR");
    return (
        <div className='m-28'>
            <h3>{text.Tag ?? ""}</h3>
            <ChangableRenderedText text={text.Text} />
        </div>
    )
}