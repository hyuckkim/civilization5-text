import { getColor } from '@/db';
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  [message: string]: string;
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    const { name } = req.query;
    if (typeof(name) === 'string') {
      if (name.match(/[^A-Z_]/g)) {
        res.status(400).end();
        return;
      }
        const data = getColor(name);
        res.status(200).json(data as any as ResponseData);
    }
    else {
        res.status(400);
    }
}