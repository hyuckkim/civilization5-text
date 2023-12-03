import react from 'react';
import {Civ5RenderedTextBlock} from '../Civ5RenderedTextBlock';
import { getColor } from '@/db';
import { Civ5RenderedTextProp, CivColors, CivSQLColor } from '@/types';
import { prerenderer } from '@/utils';

export default async function Civ5RenderedText_Server({ str }: Civ5RenderedTextProp) {
  
  const sliced = str.split(/[\[\]]/);
  const {text, key} = prerenderer(sliced);
  const colors = patchColorData(key)
    
  return (
      <div className='bg-black rounded-md p-2 border border-l-white max-w-xl'>{
          text.map((e, idx) => <Civ5RenderedTextBlock text={e} colors={colors} key={idx} />)
      }
      </div>
  );
}


function patchColorData(key: string[]): CivColors {
    const dat = key.map(d => getColorData(d));

    return dat.reduce((prev: CivColors, curr: CivSQLColor, idx) => {
        return {...prev, [key[idx]]: curr};
    }, {});
}
function getColorData(color: string): CivSQLColor {
  return getColor(color);
}