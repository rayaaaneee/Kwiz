import { BrowserRouter, Routes, Route } from "react-router-dom";

import Create from "../components/page/create";
import Play from "../components/page/play";
import MyQuizzes from "../components/page/my-quizzes";
import Quiz from "../components/page/quiz";
import Result from "../components/page/result";
import Historical from "../components/page/historical";
import P404 from "../components/page/404";
import Login from "../components/page/login";
import Redirector from "../components/redirector";

const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
        <Redirector>
          <Routes>
            <Route path={'/'} element={<Play/>} />
            <Route path={'/myquizzes'} element={<MyQuizzes />} />
            <Route path={'/play/:id'} element={<Quiz />} />
            <Route path={'/result/:id'} element={<Result/>} />
            <Route path={'/new'} element={<Create/>} />
            <Route path={'/new/:id'} element={<Create/>} />
            <Route path={'/historical'} element={<Historical/>} />
            <Route path={'/login'} element={<Login/>} />
            <Route path={'*'} element={<P404/>} />
          </Routes>
        </Redirector>
    </BrowserRouter>
  );
};

export default Router;