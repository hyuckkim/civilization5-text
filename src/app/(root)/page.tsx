"use client";

import React, { useEffect, useState } from 'react';
import ChangableRenderedText from '@/components/ChangableRenderedText';
import Link from 'next/link';
import { Civ5Text } from '@/types';

export default function Title() {
    const [text, setText] = useState<Civ5Text | undefined>(undefined);

    useEffect(() => {
        let ignore = false;
        fetch(new URL('/api/text/Language_ko_KR', document.location.origin))
            .then(async v => {
                const data = await v.json();
                if (!ignore) setText(data);
        });
        return () => { ignore = true; }
    }, []);

    if (text === undefined) return null;
    return (
        <div className='mx-auto m-0 max-w-2xl'>
            <div className="text-5xl text-center p-8">TXT_KEY formatter</div>
            <Link href={`/key/${text.Tag}`} className="underline decoration-2">{text.Tag ?? ""}</Link>
            <ChangableRenderedText text={text.Text} />
        </div>
    )
}