import { useContext, useEffect, useState } from 'react';

import Menu from '../menu';
import Loader, { LoaderColor } from '../loader';

import { GreenContainer } from '../template/green-container';
import { MainContainerPage } from '../template/main-container-page';
import { Title } from '../template/title';
import { ViewQuiz } from '../template/view-quiz';

import { getUserQuizzes } from '../../function/api/get-user-quizzes';

import cookieContext from '../../context/cookie-context';
import loadingContext from '../../context/loading-context';

import '../../asset/css/page/play.scss';

const MyQuizzes = (): JSX.Element => {

    const [selected, setSelected] = useState<number>(-1);

    document.title = "Mes quiz";

    const HandleUserIdCookie = useContext(cookieContext).get('user_id');

    const [quizzes, setQuizzes] = useState<Array<any>>([]);
    
    const { loaded, setLoaded } = useContext(loadingContext);

    useEffect(
        () => getUserQuizzes(
            HandleUserIdCookie.get(), 
            (data) => {
                setLoaded(true);
                if (data.success) {
                    setQuizzes(data.quizzes);
                } else {
                    // Toast erreur
                }
            },
        )
    );

    const loadedStyleGreenContainer: {} = { height: '400px'};


    return (
        <Menu>
            <>
                <Title text='Mes quiz' />
                <MainContainerPage>
                    <GreenContainer className="play-container flex-row flex-center" style={ loaded ? {} : loadedStyleGreenContainer}>
                    { loaded ? (
                        <div className="quiz-container flex-column flex-center align-start">
                            { quizzes.map((quiz) => (
                                <ViewQuiz quizId={ quiz.id } quizName={ quiz.theme } nbQuestions={ quiz.nbQuestions } selected={selected} selectQuiz={setSelected} canModify={ true }/>
                            )) }
                            { (quizzes.length === 0 && loaded) && <p className="no-quiz">Vous n'avez pas encore créé de quiz</p> }
                        </div>
                        ) : (   
                        <Loader color={ LoaderColor.white } />
                    ) }
                    </GreenContainer>
                </MainContainerPage>
            </>
        </Menu>
    );
}

export default MyQuizzes;