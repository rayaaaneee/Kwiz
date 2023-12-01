import { useEffect, useState } from 'react';
import { NavLink, NavigateFunction, useLocation, useNavigate } from 'react-router-dom';

import Menu from '../menu';

import { GreenContainer } from '../template/green-container';
import { MainContainerPage } from '../template/main-container-page';
import { ViewQuiz } from '../template/view-quiz';
import { InputTextGreenBorder } from '../template/input-text-green-border';
import { Button } from '../template/button';
import { Title } from '../template/title';

import '../../asset/css/page/play.scss';

 const Play = (): JSX.Element => {

    const [selected, setSelected] = useState<number>(-1);

    document.title = "Jouer - Kwiz";

    return (
        <Menu>
            <>
                <Title text={ 'Choix du quiz' } />
                <MainContainerPage>
                    <>
                        <GreenContainer className="play-container flex-row flex-center">
                            <div className="quiz-container flex-column flex-center align-start">
                                <ViewQuiz quizName='Quiz 1' nbQuestions={10} selected={selected} selectQuiz={setSelected} quizId={ 0 } />
                                <ViewQuiz quizName='Masterclass quiz' nbQuestions={24} selected={selected} selectQuiz={setSelected} quizId={ 1 }/>
                                <ViewQuiz quizName='Quoicoubel' nbQuestions={8} selected={selected} selectQuiz={setSelected} quizId={ 2 } />
                            </div>
                        </GreenContainer>
                        <div className="informations-to-play flex-row flex-center">
                            <h1 className='main-green'>Mon nom :</h1>
                            <InputTextGreenBorder/>
                            <NavLink to="/play/1" id="linkToPlay">
                                <Button id="play" text="Jouer !"/>
                            </NavLink>
                        </div>
                    </>
                </MainContainerPage>
            </>
        </Menu>
    );
}

export default Play;