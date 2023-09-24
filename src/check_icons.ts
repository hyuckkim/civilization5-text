import { getIconFiles } from "./db";
import { getIconImageExist } from "./image";

export function check_icons() {
    const iconFilePaths = getIconFiles();
    iconFilePaths.map(p => {
        if (!getIconImageExist(p)) {
            console.log("-", "\x1b[31merror\x1b[0m", `icon ${p} is not exist`);
        }
    });
}
