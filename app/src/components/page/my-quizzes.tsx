import '../../css/page/play.scss';
import { GreenContainer } from '../template/green-container';
import { MainContainerPage } from '../template/main-container-page';
import { ViewQuiz } from '../template/view-quiz';

import { useState } from 'react';

const MyQuizzes = (): JSX.Element => {

    const [selected, setSelected] = useState<string>('');

    document.title = "Mes quiz";

    const selectQuiz = (name: string) => {
        setSelected(name);
    };

    return (
        <>
            <GreenContainer className="play-container" children={
                <h1>Mes Quiz :</h1>
            }/>
            <MainContainerPage children={
                <>
                    <GreenContainer className="play-container flex-row flex-center" children={
                        <div className="quiz-container flex-column flex-center align-start">
                            <ViewQuiz quizName='Quiz 1' quizQuestions='10' selected={selected} selectQuiz={selectQuiz} canModify={ true }/>
                            <ViewQuiz quizName='Masterclass quiz' quizQuestions='24' selected={selected} selectQuiz={selectQuiz} canModify={ true }/>
                            <ViewQuiz quizName='Quoicoubeh' quizQuestions='8' selected={selected} selectQuiz={selectQuiz} canModify={ true }/>
                        </div>
                    }/>
                </>
            }/>
        </>
    );
}

export default MyQuizzes;