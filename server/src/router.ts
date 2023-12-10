import { app } from './main';

import Login from './routes/auth/post.login';
import Register from './routes/auth/post.register';
import CreateQuiz from './routes/quiz/post.create';
import UserQuizzes from './routes/quiz/get.user';
import GetQuiz from './routes/quiz/get.one';
import GetAllQuizzes from './routes/quiz/get.all';
import GetById from './routes/user/get';
import SetPassword from './routes/auth/put.password';
import SetUsername from './routes/auth/put.username';
import DeleteQuiz from './routes/quiz/delete.quiz';

// Authentication
app.post('/user/login', Login);
app.post('/user/register', Register);

// Quiz
app.get('/quiz/all/:not', GetAllQuizzes);
app.get('/quiz/user/:id', UserQuizzes);
app.get('/quiz/:id', GetQuiz);
app.post('/quiz/create', CreateQuiz);
app.delete('/quiz/delete', DeleteQuiz);

// User
app.get('/user/:id', GetById);
app.put('/user/password/:id', SetPassword);
app.put('/user/username/:id', SetUsername);