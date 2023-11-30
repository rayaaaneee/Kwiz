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

    const [selected, setSelected] = useState<string>('');

    document.title = "Jouer - Kwiz";

    const selectQuiz = (name: string) => {
        setSelected(name);
    };

    return (
        <Menu>
            <>
                <Title text={ 'Choix du quiz' } />
                <MainContainerPage>
                    <>
                        <GreenContainer className="play-container flex-row flex-center">
                            <div className="quiz-container flex-column flex-center align-start">
                                <ViewQuiz quizName='Quiz 1' quizQuestions='10' selected={selected} selectQuiz={selectQuiz} />
                                <ViewQuiz quizName='Masterclass quiz' quizQuestions='24' selected={selected} selectQuiz={selectQuiz} />
                                <ViewQuiz quizName='Quoicoubel' quizQuestions='8' selected={selected} selectQuiz={selectQuiz} />
                            </div>
                        </GreenContainer>
                        <div className="informations-to-play flex-row flex-center">
                            <h1>Mon nom :</h1>
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