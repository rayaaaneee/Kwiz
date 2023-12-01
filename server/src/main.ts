import express from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';
import * as dotenv from 'dotenv';

import Login from './routes/auth/post.login';
import Register from './routes/auth/post.register';
import CreateQuiz from './routes/quiz/post.quiz.create';
import UserQuizzes from './routes/quiz/get.user.quiz';
import GetQuiz from './routes/quiz/get.quiz';


dotenv.config();

export const db = new Database(__dirname + '\\..\\' +  process.env.DATABASE_NAME);

const app = express();

app.use(express.json(), cors());

// Authentication
app.post('/user/login', Login);
app.post('/user/register', Register);

// Quiz
app.post('/quiz/create', CreateQuiz);
app.get('/quiz/user/:id', UserQuizzes);
app.get('/quiz/:id', GetQuiz);
app.delete('/quiz/delete/:id', () => {});

const port: number = Number(process.env.PORT) || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`) );