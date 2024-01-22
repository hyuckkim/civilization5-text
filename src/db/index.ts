import { Civ5Text } from '@/types';
import sqlite from 'better-sqlite3';
import path from 'path';

const gamedb = new sqlite(path.join(process.cwd(), 'src/db/'+ 'Civ5DebugDatabase.db'));
const textdb = new sqlite(path.join(process.cwd(), 'src/db/'+ 'Localization-Merged.db'));

export const baseVersion = "1.0.3.279";
export const vpVersion = "v4.4.2";

function dbQuery(query: string, db: "game" | "text"): any[] {
    return ((db === "game") 
        ? gamedb 
        : textdb)
        .prepare(query).all();
}

export function getText(tag: string, lang: string = "Language_en_US"): Civ5Text {
    const data = dbQuery(`SELECT * FROM ${lang} WHERE Tag='${tag}'`, "text")[0];
    if (!data) 
        throw new Error(`SQLITE DB: 텍스트 ${tag}의 정보를 찾을 수 없음!`);
    return data;
}

export function getRandomText(lang: string): Civ5Text {
    const data = dbQuery(`SELECT * FROM ${lang} ORDER BY RANDOM() LIMIT 1;`, "text")[0];
    if (!data)
        throw new Error(`SQLITE DB: 무작위 텍스트 정보를 찾을 수 없음!`);
    return data;
}

export function getIconFilePath(icon: string): {
    file: string;
    offset: number;
} {
    const iconSelectionQuery = dbQuery(`SELECT * FROM IconFontMapping WHERE IconName='${icon}'`, 'game')[0];
    if (!iconSelectionQuery)
        throw new Error(`SQLITE DB: 아이콘 ${icon}의 정보를 찾을 수 없음!`);

    const iconMapping = iconSelectionQuery.IconMapping;
    const iconFontTexture = iconSelectionQuery.IconFontTexture;

    const iconFilePath = dbQuery(`SELECT IconFontTextureFile FROM IconFontTextures WHERE IconFontTexture='${iconFontTexture}'`, 'game')[0];
    if (!iconFilePath) 
        throw new Error(`SQLITE DB: 아이콘 파일 ${iconFontTexture}의 정보를 찾을 수 없음!`)

    return {file: iconFilePath.IconFontTextureFile, offset: iconMapping};
}

export function getAllIcon(): string[] {
    const allIconQuery = dbQuery(`SELECT IconName FROM IconFontMapping`, 'game');
    if (!allIconQuery)
        throw new Error(`SQLITE DB: 아이콘 불러오기 실패!`);
    return allIconQuery.map(v => v.IconName);
}

export function getIconFiles(): string[] {
    const data = dbQuery('SELECT IconFontTextureFile FROM IconFontTextures', 'game');
    return data.map(v => v.IconFontTextureFile);
}

export function getColor(color: string): {Red: number, Green: number, Blue: number, Alpha: number} {
    const data = dbQuery(`SELECT Red, Green, Blue, Alpha From Colors WHERE Type='${color}'`, "game")[0];
    if (!data)
        throw new Error(`SQLITE DB: 색 데이터 ${color}의 정보를 찾을 수 없음!`);
    return data as {Red: number, Green: number, Blue: number, Alpha: number};
}

export function getAllColorName(): string[] {
    const data = dbQuery(`SELECT Type From Colors`, "game");
    if (!data)
        throw new Error(`SQLITE DB: 색 정보 불러오기 실패!`);
    return data.map(v => v.Type);
}