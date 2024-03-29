import react from 'react';
import Civ5RenderedTextBlock from './Civ5RenderedTextBlock';
import { getColor } from '@/db';
import { Civ5RenderedTextProp, CivColors, CivSQLColor } from '@/types';
import { prerenderer, sliceBracket } from '@/utils';
import * as regexp_misc from 'regexp-misc';

export default async function Civ5RenderedText_Server({ str }: Civ5RenderedTextProp) {
  
  const sliced = regexp_misc.separate(str, /\[(.+?)\]/g);
  const {text, key} = prerenderer(sliced);
  const { text: sepText, brackets } = sliceBracket(text);
  const colors = patchColorData(key)
    
  return (
      <div className='bg-black rounded-md p-2 border border-l-white max-w-xl'>{
          sepText.map((e, idx) => <Civ5RenderedTextBlock text={e} colors={colors} brackets={brackets} key={idx} />)
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