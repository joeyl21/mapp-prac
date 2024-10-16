import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabaseSync('censusab');
export interface Partab {
id: number;
famnum: string;
pnumber: string;
pname: string;
children: boolean;
members: boolean;
comments: string;
}
export const initializeDB = async () => {
await db.execAsync(`
PRAGMA journal_mode = WAL;



CREATE TABLE IF NOT EXISTS partab (
id INTEGER PRIMARY KEY NOT NULL,
famnum TEXT NOT NULL,
pnumber TEXT NOT NULL,
pname TEXT NOT NULL,
children INTEGER NOT NULL DEFAULT 0,
members INTEGER NOT NULL DEFAULT 0,
comments TEXT NOT NULL
);
`);
};
export const addPerson = async (famnum: string, pnumber: string, pname:string, children: boolean, members: boolean, comments: string) => {
try {
const result = await db.runAsync('INSERT INTO partab (famnum, pnumber, pname, children, members, comments) VALUES (?, ?, ?, ?, ?, ?)', famnum, pnumber, pname, children, members, comments);
return result.lastInsertRowId;
} catch (error) {
    console.error("Error adding partab:", error);
    }
    };
    export const updatePerson = async (id: number, famnum: string, pnumber: string, pname:string, children: boolean, members: boolean, comments: string ) => {
    try {
    await db.runAsync('UPDATE partab SET famnum = ?, pnumber = ?, pname = ?, children = ?, members = ?, comments = ? WHERE id = ?', famnum, pnumber, pname, children, members, comments, id);
    } catch (error) {
    console.error("Error updating partab:", error);
    }
    };
    export const deletePerson = async (id: number) => {
    try {
    await db.runAsync('DELETE FROM partab WHERE id = ?', id);
    } catch (error) {
    console.error("Error deleting partab:", error);
    }
    };
    export const getPersons = async () => {
    try {
    const allRows = await db.getAllAsync('SELECT * FROM partab') as Partab[];
    return allRows;
    } catch (error) {
    console.error("Error getting partab:", error);
    return [];
    }
    };
    