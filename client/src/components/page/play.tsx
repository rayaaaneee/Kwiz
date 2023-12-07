import { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import Menu from '../menu';
import Loader, { LoaderColor } from '../loader';

import { GreenContainer } from '../template/green-container';
import { MainContainerPage } from '../template/main-container-page';
import { ViewQuiz } from '../template/view-quiz';
import { InputTextGreenBorder } from '../template/input-text-green-border';
import { Button } from '../template/button';
import { Title } from '../template/title';

import { getAllQuizzes } from '../../function/api/get-all-quizzes';

import { ToastContextManager } from '../../object/toast-context-manager';
import toastContext from '../../context/toast-context';

import '../../asset/css/page/play.scss';
import { ToastType } from '../toast';

const Play = (): JSX.Element => {

    const [selected, setSelected] = useState<number>(-1);
    const [quizzes, setQuizzes] = useState<Array<any>>([]);

    const [loaded, setLoaded] = useState<boolean>(false);
    document.title = "Jouer - Kwiz";

    const HandleToasts: ToastContextManager = useContext(toastContext);

    useEffect(() => {
        getAllQuizzes(
            data => {
                if (data.success === true) {
                    setQuizzes(data.quizzes);
                    setLoaded(true);
                }
            },
            err => {
                HandleToasts.push({
                    message: 'Cannot get quizzes, please try again later.',
                    type: ToastType.error
                })
            }
        );
    }, []);

    const containerHeight: React.CSSProperties | undefined = (!loaded && quizzes.length === 0) ? { height: '300px' } : undefined;

    return (
        <Menu>
            <>
                <Title text={ 'Choix du quiz' } />
                <MainContainerPage>
                    <>
                        <GreenContainer style={ containerHeight } className="play-container flex-row">
                            <div className="quiz-container flex-column align-start">
                            { loaded ? (
                                <>
                                    { quizzes.map((quiz: any, i: number) => (
                                        <ViewQuiz quizName={ quiz.theme } nbQuestions={ quiz.nbQuestions } selected={selected} selectQuiz={setSelected} quizId={ quiz.id } key={ i } />
                                    )) }
                                    { quizzes.length === 0 && (
                                        <div className="no-quizzes flex-column flex-center">
                                            <h1>Aucun quiz disponible</h1>
                                            <p>Créez-en un !</p>
                                        </div>
                                    ) }
                                </>
                            ) : (
                                <Loader color={ LoaderColor.white } />
                            ) }
                            </div>
                        </GreenContainer>
                        <div className="informations-to-play flex-row flex-center">
                            <h1 className='main-green'>Mon nom :</h1>
                            <InputTextGreenBorder/>
                            <NavLink to={ `/play/${ selected }`} id="linkToPlay">
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