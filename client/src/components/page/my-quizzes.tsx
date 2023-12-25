import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Menu from '../menu';
import Loader, { LoaderColor } from '../loader';

import { Container } from '../template/container';
import { MainContainerPage } from '../template/main-container-page';
import { Title } from '../template/title';
import { ViewQuiz } from '../template/view-quiz';
import { Button } from '../template/button';

import { getUserQuizzes } from '../../function/api/get-user-quizzes';

import cookieContext from '../../context/cookie-context';
import toastContext from '../../context/toast-context';
import { ToastContextManager } from '../../object/toast-context-manager';
import { ToastType } from '../toast';

import '../../asset/scss/page/play.scss';

import nothingImg from '../../asset/img/nothing.png';

const MyQuizzes = (): JSX.Element => {

    const [selected, setSelected] = useState<number>(-1);

    document.title = "My quizzes";

    const HandleUserIdCookie = useContext(cookieContext).get('user_id');
    const HandleToasts: ToastContextManager = useContext(toastContext);

    const [quizzes, setQuizzes] = useState<Array<any>>([]);

    const [loaded, setLoaded] = useState<boolean>(false);

    const location = useLocation();
    const navigate = useNavigate();

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

    const navigateToCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate('/new', { state: { from: location.pathname } });
    }

    const loadedStyleGreenContainer: {} = { height: '400px'};

    return (
        <Menu>
            <>
                <Title text='My quizzes' />
                <MainContainerPage>
                    <Container className="play-container flex-row flex-center" style={ loaded ? {} : loadedStyleGreenContainer}>
                    { loaded ? (
                        <div className="quiz-container flex-column flex-center align-start">
                            { quizzes.map((quiz) => (
                                <ViewQuiz quizId={ quiz.id } quizName={ quiz.theme } nbQuestions={ quiz.nbQuestions } selected={selected} selectQuiz={setSelected} canModify={ true }/>
                            )) }
                            { (quizzes.length === 0 && loaded) && (
                                <div className='flex flex-column flex-center w-full' style={{ rowGap: '20px' }}>
                                    <h2 className="no-quiz">You don't have any quiz.</h2>
                                    <img style={{ width: '100px' }} className="no-quiz-img" src={ nothingImg } alt="No quiz" />
                                    <Button text="Create one !" onClick={ navigateToCreate } />
                                </div>
                                )
                            }
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