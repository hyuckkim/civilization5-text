import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export async function getIconImageBuffer(imagePath: string, blockNumber: number): Promise<Buffer> {
    const relativePath = path.join(process.cwd(), 'public/icon/'+ imagePath + '.png');
    const image = fs.readFileSync(relativePath);
    return await getImageBlock(image, blockNumber);
}
export function getIconImageExist(imagePath: string): boolean {
  const relativePath = path.join(process.cwd(), 'public/icon/'+ imagePath + '.png');
  const exist = fs.existsSync(relativePath);
  return exist;
}

async function getImageBlock(image: Buffer, blockNumber: number): Promise<Buffer> {
    const fontIconSize = 22;
    // 이미지 메타데이터 가져오기
    const metadata = await sharp(image).metadata();
    
    // 이미지의 너비와 높이
    const width = metadata.width || 0;
    const height = metadata.height || 0;
    
    // 블록의 개수 계산 (가로 방향으로 fontIconSize개씩)
    const blocksPerRow = Math.floor(width / fontIconSize);
    const totalBlocks = blocksPerRow * Math.floor(height / fontIconSize);
    
    if (blockNumber < 1 || blockNumber > totalBlocks) {
      throw new Error('유효하지 않은 블록 번호');
    }
  
    // 입력된 블록 번호에 해당하는 블록 좌표 계산
    const blockX = (blockNumber - 1) % blocksPerRow;
    const blockY = Math.floor((blockNumber - 1) / blocksPerRow);
    
    // 블록 추출 및 저장
    const result = await sharp(image)
      .extract({
        left: blockX * fontIconSize,
        top: blockY * fontIconSize,
        width: fontIconSize,
        height: fontIconSize
      })
      .png().toBuffer();
  
    return result;
  }