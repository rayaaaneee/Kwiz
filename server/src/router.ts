import { app } from './main';

import Login from './routes/auth/post.login';
import Register from './routes/auth/post.register';
import CreateQuiz from './routes/quiz/post.create';
import UserQuizzes from './routes/quiz/get.user';
import GetQuiz from './routes/quiz/get.one';
import GetAllQuizzes from './routes/quiz/get.all';
import GetById from './routes/user/get';
import SetPassword from './routes/user/put.password';
import SetUsername from './routes/user/put.username';
import DeleteQuiz from './routes/quiz/delete';
import DeleteUser from './routes/user/delete';
import GetQuizHistorical from './routes/historical/get.quiz';
import CreateHistorical from './routes/historical/post.quiz';
import SearchQuiz from './routes/quiz/get.search';
import EditQuiz from './routes/quiz/put.quiz';

// Authentication
app.post('/user/login', Login);
app.post('/user/register', Register);

// Quiz
app.get('/quiz/all/:not', GetAllQuizzes);
app.get('/quiz/user/:id', UserQuizzes);
app.get('/quiz/:id', GetQuiz);
app.get('/quiz/theme/:theme/not/:userid', SearchQuiz);
app.post('/quiz/create', CreateQuiz);
app.put('/quiz/edit', EditQuiz);
app.delete('/quiz/delete', DeleteQuiz);

// User
app.get('/user/:id', GetById);
app.put('/user/password/:id', SetPassword);
app.put('/user/username/:id', SetUsername);
app.delete('/user/delete/:id', DeleteUser);

// Historical
app.get('/hist/quiz/:id', GetQuizHistorical);
app.post('/hist/quiz/:id', CreateHistorical);