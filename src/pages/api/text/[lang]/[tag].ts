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
        const data = getText(tag, lang)[0];
        res.status(200).json(data as any as ResponseData);
    }
    else {
        res.status(400);
    }
}