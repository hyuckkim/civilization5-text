import type { NextApiRequest, NextApiResponse } from 'next'
import { getText } from '@/db';

type ResponseData = {
  [message: string]: string;
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    const { lang, tag } = req.query;
    if (typeof(tag) === 'string' && typeof(lang) === 'string') {
      if (tag.match(/[^A-Z_0-9]/g)) {
        res.status(400).end();
        return;
      }
      if (lang.match(/[^A-Za-z_0-9]/g)) {
        res.status(400).end();
        return;
      }
      const data = getText(tag, lang);
      res.status(200).json(data as any as ResponseData);
    }
    else {
        res.status(400).end();
    }
}