import { CsvData, db } from './db';

export const addCsvData = async (csvData: CsvData) => {
    const id = await db.csvData.add({ ...csvData, timestamp: Date.now()});
    return id;
}

export const deleteCsvData = async (id: number) => {
    await db.csvData.delete(id);
}