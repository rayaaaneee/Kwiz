import { SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';

import { InputText } from '../template/input-text';
import { GreenContainer } from '../template/green-container';
import { MainContainerPage } from '../template/main-container-page';
import { Button } from '../template/button';
import { QuestionsRecap } from '../template/create/questions-recap';
import { InputCheckbox } from '../template/create/input-checkbox';

import { Question } from '../../object/question';
import { Quiz } from '../../object/quiz';

import '../../css/page/create.scss';


const Create = (): JSX.Element => {

    const [quiz, setQuiz] = useState<Quiz>(new Quiz());

    const {id} = useParams();

    const [isManyAnswers, setIsManyAnswers] = useState<boolean>(false);
    const isUniqueAnswer: boolean = useMemo(() => (!isManyAnswers), [isManyAnswers]);
    const [answerIndex, setAnswerIndex] = useState<number>(0);

    interface AnswerInterface {
        name: string;
        setName: React.Dispatch<SetStateAction<string>>;
        isAnswer: boolean;
        setIsAnswer: React.Dispatch<SetStateAction<boolean>>;
        checkBoxRef: React.RefObject<HTMLInputElement>;
        inputRef: React.RefObject<HTMLInputElement>;
    }

    const [answerOneIsTrue, setAnswerOneIsTrue] = useState<boolean>(false);
    const [answerTwoIsTrue, setAnswerTwoIsTrue] = useState<boolean>(false);
    const [answerThreeIsTrue, setAnswerThreeIsTrue] = useState<boolean>(false);
    const [answerFourIsTrue, setAnswerFourIsTrue] = useState<boolean>(false);

    const [answerOneName, setAnswerOneName] = useState<string>('');
    const [answerTwoName, setAnswerTwoName] = useState<string>('');
    const [answerThreeName, setAnswerThreeName] = useState<string>('');
    const [answerFourName, setAnswerFourName] = useState<string>('');

    const answers: Array<AnswerInterface> = [
        {
            name: answerOneName,
            setName: setAnswerOneName,
            isAnswer: answerOneIsTrue,
            setIsAnswer: setAnswerOneIsTrue,
            checkBoxRef: useRef<HTMLInputElement>(null),
            inputRef: useRef<HTMLInputElement>(null),
        },
        {
            name: answerTwoName,
            setName: setAnswerTwoName,
            isAnswer: answerTwoIsTrue,
            setIsAnswer: setAnswerTwoIsTrue,
            checkBoxRef: useRef<HTMLInputElement>(null),
            inputRef: useRef<HTMLInputElement>(null),
        },
        {
            name: answerThreeName,
            setName: setAnswerThreeName,
            isAnswer: answerThreeIsTrue,
            setIsAnswer: setAnswerThreeIsTrue,
            checkBoxRef: useRef<HTMLInputElement>(null),
            inputRef: useRef<HTMLInputElement>(null),
        },
        {
            name: answerFourName,
            setName: setAnswerFourName,
            isAnswer: answerFourIsTrue,
            setIsAnswer: setAnswerFourIsTrue,
            checkBoxRef: useRef<HTMLInputElement>(null),
            inputRef: useRef<HTMLInputElement>(null),
        }
    ];

    const disableAnswers = (index: number) => {
        index--;

        if (answers[index].name?.length === 0) {
            answers[index].checkBoxRef.current?.setAttribute("disabled", "true");
        } else if (answers[index].checkBoxRef.current?.hasAttribute("disabled")) {
            answers[index].checkBoxRef.current?.removeAttribute("disabled");
        }
    }

    const previousQuestions: React.MutableRefObject<AnswerInterface[]> = useRef<Array<AnswerInterface>>(answers);
    useEffect(() => {

        const answerIndexTmp: number = Math.abs(answerIndex) - 1;

        // Answer index vaut 0 si rien n'a été cliqué
        if (answerIndex !== 0) {

            if (isUniqueAnswer) {
                previousQuestions.current.forEach((question, index) => {
                    if (index !== answerIndexTmp) {
                        question.setIsAnswer(false);
                    } else {
                        answers[answerIndexTmp].setIsAnswer(true);
                    }
                });
                previousQuestions.current = answers;
            }

        }
    }, [isUniqueAnswer]);

    useEffect(() => {
        const answerIndexTmp: number = Math.abs(answerIndex) - 1;

        // Answer index vaut 0 si rien n'a été cliqué
        if (answerIndex !== 0) {

            if (isUniqueAnswer === true) {
                answers.forEach((answer, index) => {
                    if (index === answerIndexTmp) {
                        answer.setIsAnswer(bool => !bool);
                    } else {
                        answer.setIsAnswer(false);
                    }
                })
            } else if (isManyAnswers === true) {
                answers[answerIndexTmp].setIsAnswer(bool => !bool);
            }

        }
    }, [answerIndex]);

    const handleSubmitQuestion = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        let form: HTMLFormElement = e.currentTarget;
        let formData = new FormData(form);

        const questionName: string | undefined = formData.get('question-name')?.toString();
        const question: Question = new Question(
            questionName !== undefined ? questionName.toString() : '', 
            isUniqueAnswer.valueOf()
        );

        answers.forEach(answer => {
            if (answer.name.length > 0) {
                question.addAnswer(answer.name.toString(), answer.isAnswer.valueOf());
            }
        });

        // Vérifier si la question a des réposnes correctes
        let correctAnswers: number = answers.filter(answer => answer.isAnswer === true).length;

        let canAdd: boolean = (correctAnswers > 0) && (isUniqueAnswer && (correctAnswers === 1)) && (questionName !== undefined && questionName.length > 0);

        if (canAdd) {
            setQuiz((prevQuiz) => {
                console.log("add");
                let newQuiz: Quiz = Quiz.copy(prevQuiz);
                newQuiz.addQuestion(question);
                return newQuiz;
            });
            e.currentTarget.reset();
        }

    }

    const themeInputRef: React.MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);

    const handleSubmitQuiz = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        setQuiz((prevQuiz) => {
            let newQuiz: Quiz = Quiz.copy(prevQuiz);
            if (themeInputRef.current !== null) {
                newQuiz.setTheme(themeInputRef.current.value);
            }
            return newQuiz;
        });
    }

    let titleText: string = "";

    if (id === undefined) {
        document.title = "Créer un quiz - Kwiz";
        titleText = "Nouveau quiz";
    } else {
        document.title = "Modifier un quiz - Kwiz";
        titleText = "Modifier le quiz";
    }

    // TODO: Trouver un regex correct
    const initialRegex: RegExp = /(.*)/;

    return (
        <>
            <GreenContainer className="" children={
                    <h1>{titleText}</h1>
            }/>
            <MainContainerPage children={
                <>
                    <GreenContainer className="create-container theme-container flex-row align-center justify-start" children={
                        <>
                            <h1 className='no-bold'>Thème -</h1>
                            <InputText id={ "theme" } pattern={ initialRegex } placeholder={ '' } ref={ themeInputRef } value= { '' } name={ 'quiz-theme' }/>
                        </>
                    }/>
                    <form style={{ width: '100%' }} onSubmit={ handleSubmitQuestion }>
                        <GreenContainer className="create-container new-question-container flex-column flex-center" children={
                            <>
                                <div className="enter-question-container flex-row align-center justify-start">
                                    <h1 className='no-bold'>Nouvelle Question -</h1>
                                    <InputText pattern={ initialRegex } name={ 'question-name' } id={ "questionName" } placeholder={ '' } value={ '' } />
                                </div>
                                <div className='flex-row align-center justify-start' style={{ alignSelf: 'start', columnGap: '15px'}}>
                                    <label htmlFor='multipleAnswersCheckbox' style={{ fontSize: '1.1em', 'fontWeight': 300, 'cursor': 'pointer' }}>• Plusieurs réponses possibles ?</label>
                                    <InputCheckbox id={"multipleAnswersCheckbox"} onCheck={ setIsManyAnswers } checked={ isManyAnswers } ref={ null } disabled={ false } title={ undefined } name={'is-many-answers'} />
                                </div>
                                <div className="grid-answers">
                                    { answers.map((answer, i) => {
                                        i++;
                                        return (
                                            <div className="answer-container flex flex-center">
                                                <p>{i} - </p>
                                                <input ref={ answer.inputRef } 
                                                    onInput={ (e) => {
                                                        let iTmp: number = i - 1;
                                                        if (e.currentTarget.value === '') {
                                                            answers[iTmp].setIsAnswer(false);
                                                        }
                                                        answers[iTmp].setName(e.currentTarget.value);
                                                        disableAnswers(i)
                                                    } } type="text" placeholder={`Answer ${i}`} pattern={ initialRegex.toString().split('/')[1] } />
                                                <InputCheckbox id={`checkbox${i}`} onCheck={ () => setAnswerIndex(index => {
                                                    if (index === i) return -1 * index;
                                                    return i;
                                                } ) } checked={ answer.isAnswer } ref={ answer.checkBoxRef } disabled={ true } name={ `ans-${i}-is-answer` } title={ 'Séléctionner' } />
                                            </div>
                                        )
                                    })}
                                </div>
                                <Button id="validateQuestion" onClick={ undefined } text="OK"/>
                            </>
                        }/>
                    </form>
                    <GreenContainer className="create-container questions-container flex-column align-start justify-center" children={
                        <>
                            <h1 className='no-bold'>Questions du quizz :</h1>
                            <QuestionsRecap questions={ quiz.questions }/>
                        </>
                    }/>
                    <div className="validate-button-container flex align-center justify-end">
                        <NavLink to="/" onClick={ handleSubmitQuiz }>
                            <Button id="validate" onClick={ undefined } text="Valider"/>
                        </NavLink>
                    </div>
                </>
            }/>
        </>
    );
}

export default Create;