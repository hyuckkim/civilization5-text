import { NextApiRequest, NextApiResponse } from 'next';
import { getIconFilePath } from '@/db';
import { getIconImageBuffer } from '@/image';

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse) {
    const { name } = req.query;
    
    if (typeof(name) === 'string') {
      if (name.match(/[^A-Z_0-9]/g)) {
        res.status(400).end();
        return;
      }
      const { file, offset } = getIconFilePath(name);
      
      const result = await getIconImageBuffer(file, offset);

      res.status(200).setHeader('Content-Type', 'image/png').end(result);
    }
    else {
      res.status(500).send('이미지 생성 실패');
    }
}
