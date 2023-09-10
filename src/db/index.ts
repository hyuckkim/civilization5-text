import sqlite from 'better-sqlite3';

const dbroot = 'src/db/';
const gamedb = new sqlite(dbroot + 'Civ5DebugDatabase.db');
const textdb = new sqlite(dbroot + 'Localization-Merged.db');

export function getText(tag: string, lang: string = "Language_en_US") {
    const query = `SELECT * FROM ${lang} WHERE Tag=\'${tag}\' LIMIT 1;`;
    const data = textdb.prepare(query).all();
    return data;
}

export function getRandomText(lang: string) {
    const query = `SELECT * FROM ${lang} ORDER BY RANDOM() LIMIT 1;`
    const data = textdb.prepare(query).all();
    return data;
}