/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Civ5Text } from '@/types';
import { Civ5TextPanel } from '@/components';
import { useRouter } from 'next/router';

export default function Title() {
    const router = useRouter();
    const [text, setText] = useState(null as (Civ5Text | null));

    useEffect(() => {
        if (router.isReady) {
            const {key} = router.query;
            axios.get(`http://localhost:3000/api/text/Language_ko_KR/${key}`)
            .then(r => {
                setText(r.data);
            })
            .catch(e => {
                console.log(e);
            });
        }
    }, [router.isReady, router.query])
    return (
        <>
            { text !== null 
                ? <Civ5TextPanel text={text}/>
                : <div></div>
            }
        </>
    )
}