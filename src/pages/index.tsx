import React, { useState } from 'react';
import axios from 'axios';
import { Civ5Text } from '@/types';
import { Civ5TextPanel } from '@/components';

export default function Title() {
    const [text, setText] = useState(null as (Civ5Text | null));
    if (text === null) {
        axios.get('http://localhost:3000/api/text/Language_ko_KR/random')
        .then(r => {
            setText(r.data);
        })
        .catch(e => {
            console.log(e);
        });
    }
    return (
        <>
            { text !== null 
                ? <Civ5TextPanel text={text}/>
                : <div></div>
            }
            
        </>
    )
}