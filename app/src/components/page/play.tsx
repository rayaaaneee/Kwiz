import '../../css/page/play.css';
import { GreenContainer } from '../template/green-container';
import { MainContainerPage } from '../template/main-container-page';
import { ViewQuiz } from '../template/view-quiz';
import { InputTextGreenBorder } from '../template/input-text-green-border';
import { Button } from '../template/button';

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

 const Play = (): JSX.Element => {

    const [selected, setSelected] = useState<string>('');

    /* Changer le <title></title> de la page */
    document.title = "Jouer - Kwiz";

    const selectQuiz = (name: string) => {
        setSelected(name);
    };

    return (
        <>
            <GreenContainer className="play-container" children={
                <h1>Choix du quiz</h1>
            }/>
            <MainContainerPage children={
                <>
                    <GreenContainer className="play-container flex-row flex-center" children={
                        <div className="quiz-container flex-column flex-center align-start">
                            <ViewQuiz quizName='Quiz 1' quizQuestions='10' selected={selected} selectQuiz={selectQuiz}/>
                            <ViewQuiz quizName='Masterclass quiz' quizQuestions='24' selected={selected} selectQuiz={selectQuiz}/>
                            <ViewQuiz quizName='Quoicoubel' quizQuestions='8' selected={selected} selectQuiz={selectQuiz}/>
                        </div>
                    }/>
                    <div className="informations-to-play flex-row flex-center">
                        <h1>Mon nom :</h1>
                        <InputTextGreenBorder/>
                        <NavLink to="/play/1" id="linkToPlay">
                            <Button id="play" onClick={() => {}} text="Jouer !"/>
                        </NavLink>
                    </div>
                </>
            }/>
        </>
    );
}

export default Play;