import { useContext, useEffect, useState } from 'react';

import Menu from '../menu';
import Loader, { LoaderColor } from '../loader';

import { Container } from '../template/container';
import { MainContainerPage } from '../template/main-container-page';
import { Title } from '../template/title';
import { ViewQuiz } from '../template/view-quiz';

import { getUserQuizzes } from '../../function/api/get-user-quizzes';

import cookieContext from '../../context/cookie-context';
import toastContext from '../../context/toast-context';
import { ToastContextManager } from '../../object/toast-context-manager';
import { ToastType } from '../toast';

import '../../asset/scss/page/play.scss';

const MyQuizzes = (): JSX.Element => {

    const [selected, setSelected] = useState<number>(-1);

    document.title = "Mes quiz";

    const HandleUserIdCookie = useContext(cookieContext).get('user_id');
    const HandleToasts: ToastContextManager = useContext(toastContext);

    const [quizzes, setQuizzes] = useState<Array<any>>([]);

    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(
        () => getUserQuizzes(
            HandleUserIdCookie.get(), 
            (data) => {
                setLoaded(true);
                if (data.success) {
                    setQuizzes(data.quizzes);
                } else {
                    HandleToasts.push({
                        message: data.message,
                        type: ToastType.error
                    });
                }
            },
            (err) => {
                HandleToasts.push({
                    message: 'Cannot get quizzes, please try again later.',
                    type: ToastType.error
                });
            }
        )
    );

    const loadedStyleGreenContainer: {} = { height: '400px'};

    return (
        <Menu>
            <>
                <Title text='Mes quiz' />
                <MainContainerPage>
                    <Container className="play-container flex-row flex-center" style={ loaded ? {} : loadedStyleGreenContainer}>
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
                    </Container>
                </MainContainerPage>
            </>
        </Menu>
    );
}

export default MyQuizzes;