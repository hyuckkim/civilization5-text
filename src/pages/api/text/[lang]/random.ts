import type { NextApiRequest, NextApiResponse } from 'next'
import { getRandomText } from '@/db';

type ResponseData = {
  [message: string]: string;
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    const { lang } = req.query;
    if (typeof(lang) === 'string') {
      if (lang.match(/[^A-Za-z_0-9]/g)) {
        res.status(400).end();
        return;
      }
        const data = getRandomText(lang);
        res.status(200).json(data as any as ResponseData);
    }
    else {
        res.status(400);
    }
}