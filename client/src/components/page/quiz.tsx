import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";

import Menu from "../menu";

import { Quiz as QuizObject } from "../../object/entity/quiz";
import { Question } from "../../object/entity/question";

import { Container } from "../template/container";
import { MainContainerPage } from "../template/main-container-page";

import { Title } from "../template/title";
import { getQuizById } from "../../function/api/get-quiz-by-id";
import toastContext from "../../context/toast-context";
import { ToastType } from "../toast";
import { ToastContextManager } from "../../object/toast-context-manager";
import cookieContext from "../../context/cookie-context";
import Loader, { LoaderColor } from "../loader";
import { Button, ButtonColor } from "../template/button";
import { InputCheckbox } from "../template/create/input-checkbox";

import checkBoxIcon from '../../asset/img/checkbox.png';
import { createHistorical } from "../../function/api/create-historical";

const Quiz = (): JSX.Element => {

    const [score, setScore] = useState<number>(0);

    const [loaded, setLoaded] = useState<boolean>(false);

    const id: number = parseInt(useParams().id || '-1');

    const navigate: NavigateFunction = useNavigate();

    const HandleToasts: ToastContextManager = useContext(toastContext);
    const HandleUserIdCookie = useContext(cookieContext).get('user_id');

    const [quiz, setQuiz] = useState<QuizObject | null>(null);
    const [indexQuestion, setIndexQuestion] = useState<number>(-2);

    const question = useMemo<Question | null>(() => {
        if (quiz === null) return null;
        return quiz.questions[indexQuestion];
    }, [quiz, indexQuestion]);

    // On affecte le quiz
    useEffect(() => {
        getQuizById(
            id, 
            (data) => {
                if (data.success === true) {
                    setQuiz((_: QuizObject | null ) => {
                        const newQuiz = QuizObject?.copy(data.quiz);
                        if (newQuiz.theme !== undefined) {
                            document.title = `Quiz - ${newQuiz.theme}`;
                        }
                        setIndexQuestion(0);
                        return newQuiz;
                    });
                    setLoaded(true);
                } else {
                    navigate('/my-quizzes');
                    HandleToasts.push({
                        message: data.message,
                        type: ToastType.error,
                    })
                }
            },
            _ => {
                HandleToasts.push({
                    message: 'Cannot get quiz, please try again later.',
                    type: ToastType.error,
                })
            }
        );
    }, []);

    const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        if (question?.is_unique_answer === true) {
            answersCheckbox.current.forEach((el) => {
                if (el !== e.target && el !== null) {
                    el.checked = false;
                }
            });
        }
    }

    const answersCheckbox = useRef<HTMLInputElement[]>([]);

    const HandleSubmitQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {

        const nbQuestions = quiz?.questions.length || 0;
        const nbAnswers = question?.answers.length || 0;

        const selectedAnswers = answersCheckbox.current.filter(answer => answer?.checked === true);

        switch (question?.is_unique_answer) {
            case true:
                if (selectedAnswers.length !== 1) {
                    HandleToasts.push({
                        message: 'Veuillez sélectionner une réponse',
                        type: ToastType.warning,
                    });
                    return;
                }
                break;
            default:
            case false:
                if (selectedAnswers.length < 2) {
                    HandleToasts.push({
                        message: 'Veuillez sélectionner plusieurs réponses',
                        type: ToastType.warning,
                    });
                    return;
                }
                break;
        }

        let isCorrect: boolean = true;
        answersCheckbox.current.forEach((el, i) => {
            if (i <= (nbAnswers - 1)) {
                if (el?.checked !== question?.answers[i].is_ok) {
                    isCorrect = false;
                }
            }
        });

        if (isCorrect) {
            setScore((score) => ( score + 1 ));
            HandleToasts.push({
                message: 'Bonne réponse !',
                type: ToastType.success,
            });
        } else {
            HandleToasts.push({
                message: 'Mauvaise réponse !',
                type: ToastType.error,
            });
        }

        setIndexQuestion((indexQuestion) => {
            const newIndex = indexQuestion + 1;
            if (newIndex >= nbQuestions) {
                return -1;
            } else {
                answersCheckbox.current.forEach((el) => {
                    if (el !== null) {
                        el.checked = false;
                    }
                });
                answersCheckbox.current = [];
                return newIndex;
            }
        })
    }

    useEffect(() => {
        (loaded && (indexQuestion === -1)) && createHistorical(
            id,
            HandleUserIdCookie.get(),
            score,
            (data) => {
                if (data.success === true) {
                    HandleToasts.push({
                        message: data.message,
                        type: ToastType.success,
                    });
                } else {
                    HandleToasts.push({
                        message: data.message,
                        type: ToastType.error,
                    });
                }
            },
            (err) => {
                HandleToasts.push({
                    message: 'Cannot create historical, please try again later.',
                    type: ToastType.error,
                });
            }
        );
    }, [indexQuestion]);

    return (
        <Menu>
            <>
                { loaded ? (
                    <>
                        <Title text={ document.title } />

                        <MainContainerPage>
                        { indexQuestion === -1 ? (
                            <>
                                <Container>
                                    <h1>Quiz terminé !</h1>
                                </Container>
                                <Container className="flex flex-column flex-center">
                                    <h2 style={{ textAlign: 'center' }}>Votre score est de { score } / { quiz?.questions.length || 0 } !</h2>
                                    <img src={ checkBoxIcon } width={ '120px' } alt="checbkbox" />
                                    <Button style={{ margin: '0 auto', marginBottom: '30px'}} color={ ButtonColor.blue } onClick={ (e) => navigate(`/ranking/${id}`) } text="Voir votre classement" />
                                </Container>
                            </>
                        ) : (
                            <>
                                <Container className="question-container">
                                    <h2>Question 1 : { question?.question_text || 'Loading ...' }</h2>
                                </Container>

                                <Container style={{ height: '200px', position: 'relative' }} className="flex flex-column flex-center">
                                    <>
                                        <h4 style={{ position: 'absolute', top: '0', left: 0, textAlign: 'start', textTransform: 'none'}}>* { question?.is_unique_answer ? 'Une seule réponse possible' : 'Plusieurs réponses possibles' }</h4>
                                        <div className="grid-answers" style={{ margin: '0 auto'}}>

                                            { question?.answers.map((answer, i) => (
                                                <div key={i} className="answer-container flex align-center justify-end">
                                                    <label htmlFor={`checkbox${i}`}>{answer.answer_text}</label>
                                                    <InputCheckbox onCheck={ onCheck } ref={ (el) => (answersCheckbox.current[i] = el!) } id={`checkbox${i}`} title={ answer.answer_text.length > 0 ? 
                                                        'Séléctionner' :
                                                        'Veuillez entrer une réponse'
                                                    } />
                                                </div>
                                            ))}

                                        </div>
                                        <Button onClick={ HandleSubmitQuestion } id="validateQuestion" text="OK"/>

                                    </>
                                </Container>
                            </>
                        ) }
                        </MainContainerPage>
                    </>
                ) : (
                    <div style={{ width: '90%', height: '95vh'}}>
                        <Loader color={ LoaderColor.green } />
                    </div>
                ) }
            </>
        </Menu>
    );
};

export default Quiz;