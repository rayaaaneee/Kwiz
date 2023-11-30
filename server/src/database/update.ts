import Database from 'better-sqlite3';
import * as dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const update = (file: string) => {
    const database_name: string = process.env.DATABASE_NAME || 'database.db';

    const sql: string = fs.readFileSync(`${__dirname}\\${file}.sql`, 'utf8');

    const queries: string[] = sql.split('--');
    const db = new Database(`${__dirname}\\..\\..\\${database_name}`);

    queries.forEach((query: string) => {
      db.prepare(query).run();
    });

    db.close();

    process.exit(0);
}

export default update;
