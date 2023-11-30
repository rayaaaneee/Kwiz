import express from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';
import * as dotenv from 'dotenv';

import Login from './routes/post.login';
import Register from './routes/post.register';


dotenv.config();

export const db = new Database(__dirname + '\\..\\' +  process.env.DATABASE_NAME);

const app = express();

app.use(express.json(), cors());

app.post('/user/login', Login);

app.post('/user/register', Register);

const port: number = Number(process.env.PORT) || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`) );