import sqlite from 'better-sqlite3';

const dbroot = 'src/db/';
const gamedb = new sqlite(dbroot + 'Civ5DebugDatabase.db');
const textdb = new sqlite(dbroot + 'Localization-Merged.db');

function dbQuery(query: string, db: "game" | "text"): any[] {
    return ((db === "game") 
        ? gamedb 
        : textdb)
        .prepare(query).all();;
}

export function getText(tag: string, lang: string = "Language_en_US") {
    return dbQuery(`SELECT * FROM ${lang} WHERE Tag='${tag}'`, "text");
}

export function getRandomText(lang: string) {
    return dbQuery(`SELECT * FROM ${lang} ORDER BY RANDOM() LIMIT 1;`, "text");
}

export function getIconFilePath(icon: string): {
    file: string;
    offset: number;
} {
    const iconSelectionQuery = dbQuery(`SELECT * FROM IconFontMapping WHERE IconName='${icon}'`, 'game')[0];

    const iconMapping = iconSelectionQuery.IconMapping;
    const iconFontTexture = iconSelectionQuery.IconFontTexture;

    const iconFilePath = dbQuery(`SELECT IconFontTextureFile FROM IconFontTextures WHERE IconFontTexture='${iconFontTexture}'`, 'game')[0].IconFontTextureFile;
    return {file: iconFilePath, offset: iconMapping};
}

export function getIconFiles(): string[] {
    const data = dbQuery('SELECT IconFontTextureFile FROM IconFontTextures', 'game');
    return data.map(v => v.IconFontTextureFile);
}

export function getColor(color: string): {Red: number, Green: number, Blue: number, Alpha: number} {
    return dbQuery(`SELECT Red, Green, Blue, Alpha From Colors WHERE Type='${color}'`, "game")[0] as {Red: number, Green: number, Blue: number, Alpha: number};
}