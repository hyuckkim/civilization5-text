import React from 'react';
import { getRandomText } from '@/db';
import ChangableRenderedText from '@/components/ChangableRenderedText';
import Link from 'next/link';

export default async function Title() {
    const text = getRandomText("Language_ko_KR");
    return (
        <div className='mx-auto m-0 max-w-2xl'>
            <div className="text-5xl text-center p-8">TXT_KEY formatter</div>
            <Link href={`/${text.Tag}`} className="underline decoration-2">{text.Tag ?? ""}</Link>
            <ChangableRenderedText text={text.Text} />
        </div>
    )
}