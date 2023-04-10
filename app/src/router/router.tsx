import {Menu} from "../components/menu";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Create from "../components/page/create";
import Play from "../components/page/play";
import Quiz from "../components/page/quiz";
import Result from "../components/page/result";
import Historical from "../components/page/historical";

const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
        <Menu/>
          <main>
            <div className="page-container flex flex-center">
              <div className="content-page flex-column flex-center">
                <Routes>
                  <Route path={'/'} element={<Play/>} />
                  <Route path={'/play/:id'} element={<Quiz/>} />
                  <Route path={'/result/:id'} element={<Result/>} />
                  <Route path={'/new/'} element={<Create/>} />
                  <Route path={'/new/:id'} element={<Create/>} />
                  <Route path={'/historical'} element={<Historical/>} />
                </Routes>
              </div>
            </div>
          </main>
    </BrowserRouter>
  );
};

export default Router;