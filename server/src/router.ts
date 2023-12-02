import { app } from './main';

import Login from './routes/auth/post.login';
import Register from './routes/auth/post.register';
import CreateQuiz from './routes/quiz/post.quiz.create';
import UserQuizzes from './routes/quiz/get.user.quiz';
import GetQuiz from './routes/quiz/get.quiz';
import GetAllQuizzes from './routes/quiz/get.all';

// Authentication
app.post('/user/login', Login);
app.post('/user/register', Register);

// Quiz
app.get('/quiz/all', GetAllQuizzes);
app.get('/quiz/user/:id', UserQuizzes);
app.get('/quiz/:id', GetQuiz);
app.post('/quiz/create', CreateQuiz);
app.delete('/quiz/delete/:id', () => {});