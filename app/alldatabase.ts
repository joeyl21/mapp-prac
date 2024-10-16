import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabaseSync('censusall');
export interface partall {

id: number;
personno: string;
personname: string;
relo: string;
gender: string;
date: string;
age: string;
marital: string;
citizen: string
specify: string;
}
export const initializeDB = async () => {
await db.execAsync(`
PRAGMA journal_mode = WAL;



CREATE TABLE IF NOT EXISTS partall (
id INTEGER PRIMARY KEY NOT NULL,
personno TEXT NOT NULL,
personname TEXT NOT NULL,
relo TEXT NOT NULL,
gender TEXT NOT NULL,
date TEXT NOT NULL,
age TEXT NOT NULL,
marital TEXT NOT NULL,
citizen TEXT NOT NULL,
specify TEXT NOT NULL
);
`);
};
export const addPerson = async (personno: string, personname: string, relo:string, gender: string, date: string, age: string, marital:string, citizen:string, specify:string) => {
try {
const result = await db.runAsync('INSERT INTO partall (personno, personname, relo, gender, date, age, marital, citizen, specify) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', personno, personname, relo, gender, date, age, marital, citizen, specify);
return result.lastInsertRowId;
} catch (error) {
    console.error("Error adding partall:", error);
    }
    };
    export const updatePerson = async (id: number,personno: string, personname: string, relo:string, gender: string, date: string, age: string, marital:string, citizen:string, specify:string) => {
    try {
    await db.runAsync('UPDATE partall SET personno = ?, personname = ?, relo = ?, gender = ?, date = ?, age = ?, marital = ?, citizen = ?, specify = ?  WHERE id = ?', personno, personname, relo, gender, date, age, marital, citizen, specify, id);
    } catch (error) {
    console.error("Error updating partall:", error);
    }
    };
    export const deletePerson = async (id: number) => {
    try {
    await db.runAsync('DELETE FROM partall WHERE id = ?', id);
    } catch (error) {
    console.error("Error deleting partall:", error);
    }
    };
    export const getPersons = async () => {
    try {
    const allRows = await db.getAllAsync('SELECT * FROM partall') as partall[];
    return allRows;
    } catch (error) {
    console.error("Error getting partall:", error);
    return [];
    }
    };
    