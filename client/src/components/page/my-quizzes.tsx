import { useState } from 'react';

import Menu from '../menu';
import { GreenContainer } from '../template/green-container';
import { MainContainerPage } from '../template/main-container-page';
import { Title } from '../template/title';
import { ViewQuiz } from '../template/view-quiz';

import '../../asset/css/page/play.scss';

const MyQuizzes = (): JSX.Element => {

    const [selected, setSelected] = useState<string>('');

    document.title = "Mes quiz";

    const selectQuiz = (name: string) => {
        setSelected(name);
    };

    return (
        <Menu>
            <>
                <Title text='Mes quiz' />
                <MainContainerPage>
                    <GreenContainer className="play-container flex-row flex-center">
                        <div className="quiz-container flex-column flex-center align-start">
                            <ViewQuiz quizName='Quiz 1' quizQuestions='10' selected={selected} selectQuiz={selectQuiz} canModify={ true }/>
                            <ViewQuiz quizName='Masterclass quiz' quizQuestions='24' selected={selected} selectQuiz={selectQuiz} canModify={ true }/>
                            <ViewQuiz quizName='Quoicoubeh' quizQuestions='8' selected={selected} selectQuiz={selectQuiz} canModify={ true }/>
                        </div>
                    </GreenContainer>
                </MainContainerPage>
            </>
        </Menu>
    );
}

export default MyQuizzes;