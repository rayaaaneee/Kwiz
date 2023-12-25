import { useEffect, useState, useContext, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import Menu from '../menu';
import Loader, { LoaderColor } from '../loader';

import { Container } from '../template/container';
import { MainContainerPage } from '../template/main-container-page';
import { ViewQuiz } from '../template/view-quiz';
import { Button } from '../template/button';
import { Title } from '../template/title';
import { InputText } from '../template/input-text';

import { getAllQuizzes } from '../../function/api/get-all-quizzes';
import { fetchSearchQuizzes } from '../../function/api/search-quizzes';

import { ToastContextManager } from '../../object/toast-context-manager';
import { ToastType } from '../toast';

import toastContext from '../../context/toast-context';
import cookieContext from '../../context/cookie-context';
import { CookieInterface } from '../../interface/cookie-interface';

import '../../asset/scss/page/play.scss';

const Play = (): JSX.Element => {

    const [selected, setSelected] = useState<number>(-1);
    const [quizzes, setQuizzes] = useState<Array<any>>([]);

    const [loaded, setLoaded] = useState<boolean>(false);
    document.title = "Play - Kwiz";

    const HandleCookieUserId: CookieInterface = useContext(cookieContext).get('user_id');
    const HandleToasts: ToastContextManager = useContext(toastContext);


    const getQuizzes = () => {
        getAllQuizzes(
            HandleCookieUserId.get(),
            data => {
                if (data.success === true) {
                    setQuizzes(data.quizzes);
                    setLoaded(true);
                }
            },
            _ => {
                HandleToasts.push({
                    message: 'Cannot get quizzes, please try again later.',
                    type: ToastType.error
                })
            }
        );
    }

    useEffect(() => {
        getQuizzes();
    }, []);

    const onSearch = (e: React.FormEvent<HTMLInputElement>) => {
        setLoaded(false);
        if (e.currentTarget.value.length === 0) {
            getQuizzes();
        } else {
            fetchSearchQuizzes(
                e.currentTarget.value,
                HandleCookieUserId.get(),
                data => {
                    if (data.success === true) {
                        setQuizzes(data.quizzes);
                        setLoaded(true);
                    }
                },
                err => {
                    HandleToasts.push({
                        message: 'Cannot search quizzes, please try again later.',
                        type: ToastType.error
                    })
                }
            );
        }
    }

    return (
        <Menu>
            <>
                <Title text={ 'Choose your quiz' } />
                <MainContainerPage>
                    <>
                        <Container className='flex flex-start' style={{ padding: '20px 0', alignItems: 'center' }} >
                            <label style={{ fontSize: '25px'}} htmlFor='search-input'>Search :</label>
                            <InputText onInput={ onSearch } placeholder='theme' id='search-input' />
                        </Container>
                        <Container style={ !loaded ? { height: '400px' } : undefined } className="play-container flex-row">
                            <div className="quiz-container flex-column align-start">
                            { loaded ? (
                                <>
                                    { quizzes.map((quiz: any, i: number) => (
                                        <ViewQuiz quizName={ quiz.theme } nbQuestions={ quiz.nbQuestions } selected={selected} selectQuiz={setSelected} quizId={ quiz.id } key={ i } />
                                    )) }
                                    { quizzes.length === 0 && (
                                        <div className="no-quizzes flex-column flex-center">
                                            <h2>No quizzes available.</h2>
                                        </div>
                                    ) }
                                </>
                            ) : (
                                <Loader color={ LoaderColor.white } />
                            ) }
                            </div>
                        </Container>
                        { loaded && (
                            <>
                                { quizzes.length !== 0 && (
                                    <div className="informations-to-play flex-row flex-center" style={{ marginTop: '40px'}}>
                                        <NavLink style={{ textDecoration: 'none' }} to={ `/play/${ selected }`} id="linkToPlay">
                                            <Button id="play" text="Jouer !"/>
                                        </NavLink>
                                    </div>
                                ) }
                            </>
                        ) }
                    </>
                </MainContainerPage>
            </>
        </Menu>
    );
}

export default Play;