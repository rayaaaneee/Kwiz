import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { Button } from "../button";
import { InputCheckbox } from "./input-checkbox";
import { QuestionsRecap } from "./questions-recap";
import { GreenContainer } from "../green-container";
import { InputText } from "../input-text";
import { MainContainerPage } from "../main-container-page";
import { Title } from "../title";
import { AnswerInterface } from "../../page/create";
import { Quiz } from "../../../object/entity/quiz";
import { useEffect } from "react";
import { Question } from "../../../object/entity/question";
import { Answer } from "../../../object/entity/answer";

import loadingContext from "../../../context/loading-context";
import Loader, { LoaderColor } from "../../loader";

interface QuizEditorInterface {

    titleText: string;

    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;

    selectedIndexQuestion: number;
    setSelectedIndexQuestion: React.Dispatch<React.SetStateAction<number>>;

    questionName: string;
    setQuestionName: React.Dispatch<React.SetStateAction<string>>;

    isManyAnswers: boolean;
    isUniqueAnswer: boolean;
    setIsManyAnswers: React.Dispatch<React.SetStateAction<boolean>>;

    answerIndex: number;
    setAnswerIndex: React.Dispatch<React.SetStateAction<number>>;

    quiz: Quiz;

    answers: Array<AnswerInterface>;

    previousQuestions: React.MutableRefObject<AnswerInterface[]>;

    handleSubmitQuestion: (e: React.FormEvent<HTMLFormElement>) => void;
    handleSubmitQuiz: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const QuizEditor = (props: QuizEditorInterface): JSX.Element => {

    const { loaded, setLoaded } = useContext(loadingContext);

    // Si une question est séléctionnée, on met ses informations pour la modifier
    useEffect(() => {
        if (props.selectedIndexQuestion !== -1) {
            const question: Question = props.quiz.questions[props.selectedIndexQuestion];
            const questionAnswers: Answer[] = question.answers;

            props.setIsManyAnswers(!question.is_unique_answer);
            props.setQuestionName(question.question_text);

            props.answers.forEach((answer, index) => {
                if (index < questionAnswers.length) {
                    answer.setName(questionAnswers[index].answer_text);
                    answer.setIsAnswer(questionAnswers[index].is_ok);
                    if (answer.inputRef.current !== null) {
                        answer.inputRef.current.value = questionAnswers[index].answer_text;
                        answer.inputRef.current.disabled = false;
                    }
                } else {
                    answer.setName('');
                    answer.setIsAnswer(false);
                    if (answer.inputRef.current !== null) {
                        answer.inputRef.current.value = '';
                        answer.inputRef.current.disabled = false;
                    }
                }
            });
        }

    }, [props.selectedIndexQuestion]);

    // Gestion de la mise à jour des réponses en cas de changement de type de réponse (unique / multiple)
    useEffect(() => {

        const answerIndexTmp: number = Math.abs(props.answerIndex) - 1;

        // Answer index vaut 0 si rien n'a été cliqué
        if (props.answerIndex !== 0) {

            if (props.isUniqueAnswer) {
                console.log(props.previousQuestions.current);
                props.previousQuestions.current.forEach((question, index) => {
                    if (index !== answerIndexTmp) {
                        question.setIsAnswer(false);
                    } else {
                        props.answers[answerIndexTmp].setIsAnswer(true);
                    }
                });
                props.previousQuestions.current = props.answers;
            }

        }
    }, [props.isUniqueAnswer]);

    // Gestion du clic sur une réponse
    useEffect(() => {
        const answerIndexTmp: number = Math.abs(props.answerIndex) - 1;

        // Answer index vaut 0 si rien n'a été cliqué
        if (props.answerIndex !== 0) {

            if (props.isUniqueAnswer) {
                props.answers.forEach((answer, index) => {
                    if (index === answerIndexTmp) {
                        answer.setIsAnswer(bool => !bool);
                    } else {
                        answer.setIsAnswer(false);
                    }
                })
            } else if (props.isManyAnswers) {
                props.answers[answerIndexTmp].setIsAnswer(bool => !bool);
            }

        }
    }, [props.answerIndex]);

    // Une réponse ne peut pas être séléctionnée si elle n'a pas de texte
    const disableAnswers = (index: number) => {
        index--;

        if (props.answers[index].name?.length === 0) {
            props.answers[index].checkBoxRef.current?.setAttribute("disabled", "true");
        } else if (props.answers[index].checkBoxRef.current?.hasAttribute("disabled")) {
            props.answers[index].checkBoxRef.current?.removeAttribute("disabled");
        }
    }

    // TODO: Bug à regler, lorsqu'on revient sur une question déjà créée, et qu'on modifie le 'isUniqueAnswer' de la question, les réponses ne sont pas mises à jour

    // TODO: Trouver un regex correct
    const initialRegex: RegExp = /(.*)/;

    return (
        <>
            <Title text={ props.titleText } />
            <MainContainerPage>
                { (loaded === false) ? (
                    <div className="flex flex-center" style={{ height: '70vh' }}>
                        <Loader color={ LoaderColor.green } />
                    </div>
                ) : (
                    <>
                        <GreenContainer className="create-container theme-container flex-row align-center justify-start">
                            <>
                                <h1 className='no-bold'>Thème -</h1>
                                <InputText id={ "theme" } pattern={ initialRegex } value= { props.theme } setValue={ props.setTheme } name={ 'quiz-theme' }/>
                            </>
                        </GreenContainer>
                        <form style={{ width: '100%' }} onSubmit={ props.handleSubmitQuestion }>
                            <GreenContainer className="create-container new-question-container flex-column flex-center">
                                <>
                                    <div className="enter-question-container flex-row align-center justify-start">
                                        <h1 className='no-bold'>{ props.selectedIndexQuestion === -1 ? 'Nouvelle Question' : 'Modifier Question' } -</h1>
                                        <InputText pattern={ initialRegex } name={ 'question-name' } id={ "questionName" } value={ props.questionName } setValue={ props.setQuestionName } />
                                    </div>
                                    <div className='flex-row align-center justify-start' style={{ alignSelf: 'start', columnGap: '15px'}}>
                                        <label htmlFor='multipleAnswersCheckbox' style={{ fontSize: '1.1em', 'fontWeight': 300, 'cursor': 'pointer' }}>• Plusieurs réponses possibles ?</label>
                                        <InputCheckbox id={"multipleAnswersCheckbox"} onCheck={ props.setIsManyAnswers } checked={ props.isManyAnswers } name={'is-many-answers'} />
                                    </div>
                                    <div className="grid-answers">
                                        { props.answers.map((answer, i) => {
                                            i++;
                                            return (
                                                <div className="answer-container flex flex-center">
                                                    <p>{i} - </p>
                                                    <input ref={ answer.inputRef } 
                                                        onInput={ (e) => {
                                                            let iTmp: number = i - 1;
                                                            if (e.currentTarget.value === '') {
                                                                props.answers[iTmp].setIsAnswer(false);
                                                            }
                                                            props.answers[iTmp].setName(e.currentTarget.value);
                                                            disableAnswers(i)
                                                        } } type="text" placeholder={`Answer ${i}`} pattern={ initialRegex.toString().split('/')[1] } />
                                                    <InputCheckbox id={`checkbox${i}`} onCheck={ () => props.setAnswerIndex(index => {
                                                        if (index === i) return -1 * index;
                                                        return i;
                                                    } ) } checked={ answer.isAnswer } ref={ answer.checkBoxRef } disabled={ true } name={ `ans-${i}-is-answer` } title={    answer.name.length > 0 ? 
                                                        'Séléctionner' :
                                                        'Veuillez entrer une réponse'
                                                    } />
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <Button id="validateQuestion" text="OK"/>
                                </>
                            </GreenContainer>
                            </form>
                            <GreenContainer className="create-container questions-container flex-column align-start justify-center">
                                <>
                                    <h1 className='no-bold'>Questions du quizz :</h1>
                                    <QuestionsRecap selectedIndex={ props.selectedIndexQuestion } setSelectedIndex={ props.setSelectedIndexQuestion } questions={ props.quiz.questions }/>
                                </>
                            </GreenContainer>
                            <div className="validate-button-container flex align-center justify-end">
                                <NavLink to="/my-quizzes" onClick={ props.handleSubmitQuiz }>
                                    <Button id="validate" text="Valider"/>
                                </NavLink>
                            </div>
                    </>
                ) }
            </MainContainerPage>
        </>
    );
}

export default QuizEditor;