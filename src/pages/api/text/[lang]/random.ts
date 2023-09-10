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
        const data = getRandomText(lang)[0];
        res.status(200).json(data as any as ResponseData);
    }
    else {
        res.status(400);
    }
}