import * as SQLite from 'expo-sqlite';



const db = SQLite.openDatabaseAsync('census');
export interface Person {
id: number;
province: string;
District: string;
LLG: string;
wards: string;
censusunit: string; // Consider using a Date type depending on your date format
censusunittype: string;
workload: string;
locality: string;
section: string;
lot: string;
structure: string;
pd: string;
household: string;

}
export const initializeDB = async () => {
await (await db).execAsync(`
PRAGMA journal_mode = WAL;


CREATE TABLE IF NOT EXISTS person (
id INTEGER PRIMARY KEY NOT NULL,
province TEXT NOT NULL,
District TEXT NOT NULL,
LLG TEXT NOT NULL,
wards TEXT NOT NULL,
censusunit TEXT NOT NULL,
censusunittype TEXT NOT NULL,
workload TEXT NOT NULL,
locality TEXT NOT NULL,
section TEXT NOT NULL,
lot TEXT NOT NULL,
structure TEXT NOT NULL,
pd TEXT NOT NULL,
household TEXT NOT NULL
);


`);
};
export const addPerson = async (province: string, District: string, LLG: string, wards: string, censusunit: string, censusunittype: string, workload: string, locality: string, section: string, lot: string, structure: string, pd: string, household: string) => {
    try {
    const result = await (await db).runAsync('INSERT INTO person (province, District, LLG, wards, censusunit, censusunittype, workload, locality, section, lot, structure, pd, household) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', province, District, LLG, wards, censusunit, censusunittype, workload, locality, section, lot, structure, pd, household);
    return result.lastInsertRowId;
    } catch (error) {
    console.error("Error adding person:", error);
    }
    };


export const updatePerson = async (id: number, province: string, District: string, LLG: string, wards: string, censusunit: string, censusunittype: string, workload: string, locality: string, section: string, lot: string, structure: string, pd: string, household: string) => {
    try {
    await (await db).runAsync('UPDATE person SET province = ?, District = ?, LLG =?, wards = ?, censusunit = ?, censusunittype = ?, workload = ?, locality = ?, section = ?, lot = ?, structure = ?, pd = ?, household = ? WHERE id = ?', province, District, LLG, wards, censusunit, censusunittype, workload, locality, section, lot, structure, pd, household, id);
    } catch (error) {
    console.error("Error updating person:", error);
    }
    };
    export const deletePerson = async (id: number) => {
    try {
    await (await db).runAsync('DELETE FROM person WHERE id = ?', id);
    } catch (error) {
    console.error("Error deleting person:", error);
    }
    };
    export const getPersons = async () => {
        try {
        const allRows = await (await db).getAllAsync('SELECT * FROM person') as Person[];
        return allRows;
        } catch (error) {
        console.error("Error getting persons:", error);
        return [];
    }
    };
    