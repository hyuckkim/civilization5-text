import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { imageName } = req.query;
  const imagePath = path.join(process.cwd(), 'public', 'api', 'img', imageName as string);

  // 이미지 파일이 존재하는지 확인
  if (fs.existsSync(imagePath)) {
    // 이미지를 스트림으로 읽어서 전송
    const imageStream = fs.createReadStream(imagePath);
    res.setHeader('Content-Type', 'image/jpeg'); // 이미지 유형에 따라 Content-Type 변경
    imageStream.pipe(res);
  } else {
    res.status(404).send('Image not found');
  }
};
