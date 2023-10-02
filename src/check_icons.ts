import { getIconFiles } from "./db";
import { getIconImageExist } from "./image";

export type imageFileExistedInfo = {
    success: number,
    fail: number,
    log: string[]
}
export function check_icons(): imageFileExistedInfo {
    const info: imageFileExistedInfo = {success: 0, fail: 0, log: []};

    const iconFilePaths = getIconFiles();
    iconFilePaths.map(p => {
        if (!getIconImageExist(p)) {
            ++info.fail;
            info.log.push(`icon ${p} is not exist`);
        }
        else {
            ++info.success;
            info.log.push(`icon ${p} is exist`);
        }
    });
    
    return info;
}
