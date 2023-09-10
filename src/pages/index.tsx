import React, { useState } from 'react';
import axios from 'axios';
import { Civ5Text } from '@/types';

export default function title() {
    const [text, setText] = useState(null as (Civ5Text | null));
    if (text === null) {
        axios.get('./api/text/Language_ko_KR/random').then(r => {
            setText(r.data);
        });
    }
    return (
        <div>
            { text !== null 
                ? <div>
                    <div>{text.Tag ?? ""}</div>
                    <textarea>{text.Text ?? ""}</textarea>
                </div>
                : <div></div>
            }
            
        </div>
    )
}