import Dexie, { Table } from 'dexie';

export interface CsvData {
    id?: number;
    fileName: string;
    size: number;
    type: string;
    data: string;
    timestamp?: number;
}


export class MyDatabase extends Dexie {
    csvData!: Table<CsvData>;
    constructor() {
        super('MyDatabase');
        this.version(1).stores({
            csvData: '++id, data, timestamp'
        });
    }
}

export const db = new MyDatabase();