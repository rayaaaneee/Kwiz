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

import loadingContext from '../../context/loading-context';



import '../../asset/css/page/play.scss';



const Play = (): JSX.Element => {

    const [selected, setSelected] = useState<number>(-1);
    const [quizzes, setQuizzes] = useState<Array<any>>([]);

    const { loaded, setLoaded } = useContext(loadingContext);

    document.title = "Jouer - Kwiz";

    useEffect(() => {
        getAllQuizzes(
            data => {
                console.log(data);
                if (data.success === true) {
                    setQuizzes(data.quizzes);
                    setLoaded(true);
                }
            }
        )
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