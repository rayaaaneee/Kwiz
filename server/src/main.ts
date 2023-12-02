import express from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

export const db = new Database(path.resolve(
    __dirname,
    '..',
    process.env.DATABASE_NAME!
));

export const app = express();

app.use(express.json(), cors(), cookieParser());

import('./router');

const port: number = Number(process.env.PORT) || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`) );