import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Create from "../components/page/create";
import Play from "../components/page/play";
import MyQuizzes from "../components/page/my-quizzes";
import Quiz from "../components/page/quiz";
import Result from "../components/page/result";
import Historical from "../components/page/historical";
import P404 from "../components/page/404";
import Login from "../components/page/login";
import Redirector from "../components/redirector";
import Edit from "../components/page/edit";
import { useEffect, useState } from "react";

const Router = (): JSX.Element => {

  const [loaded, setLoaded] = useState<boolean>(false);

  const location = useLocation();

  useEffect(() => setLoaded(false), [loaded]);

  const pageProperties = {
    loaded: loaded,
    setLoaded: setLoaded
  }

  return (
    <BrowserRouter>
        <Redirector>
          <Routes>
            <Route path={'/'} element={<Play  {...pageProperties} />} />
            <Route path={'/myquizzes'} element={<MyQuizzes {...pageProperties} />} />
            <Route path={'/play/:id'} element={<Quiz />} />
            <Route path={'/result/:id'} element={<Result/>} />
            <Route path={'/new'} element={<Create {...pageProperties}/>} />
            <Route path={'/edit/:id'} element={<Edit {...pageProperties}/>} />
            <Route path={'/historical'} element={<Historical {...pageProperties}/>} />
            <Route path={'/login'} element={<Login {...pageProperties}/>} />
            <Route path={'*'} element={<P404/>} />
          </Routes>
        </Redirector>
    </BrowserRouter>
  );
};

export default Router;