import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Create from "../components/page/create";
import Play from "../components/page/play";
import MyQuizzes from "../components/page/my-quizzes";
import Quiz from "../components/page/quiz";
import Historical from "../components/page/historical";
import P404 from "../components/page/404";
import Login from "../components/page/login";
import Redirector from "../components/redirector";
import Edit from "../components/page/edit";
import Profile from "../components/page/profile";
import Ranking from "../components/page/ranking";

const Router = (): JSX.Element => {

  return (
    <BrowserRouter>
        <Redirector>
          <Routes>
            <Route path={'/play'} element={<Play/>} />
            <Route path={'/my-quizzes'} element={<MyQuizzes/>} />
            <Route path={'/play/:id'} element={<Quiz />} />
            <Route path={'/ranking/:id'} element={<Ranking/>} />
            <Route path={'/new'} element={<Create/>} />
            <Route path={'/profile'} element={<Profile/>} />
            <Route path={'/edit/:id'} element={<Edit/>} />
            <Route path={'/historical'} element={<Historical/>} />
            <Route path={'/my-historical'} element={<P404/>} />
            <Route path={'/'} element={<Login/>} />
            <Route path={'*'} element={<P404/>} />
          </Routes>
        </Redirector>
    </BrowserRouter>
  );
};

export default Router;