import { SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';

import Menu from '../menu';

import { InputText } from '../template/input-text';
import { GreenContainer } from '../template/green-container';
import { MainContainerPage } from '../template/main-container-page';
import { Button } from '../template/button';
import { QuestionsRecap } from '../template/create/questions-recap';
import { InputCheckbox } from '../template/create/input-checkbox';
import { Answer } from '../../object/answer';
import { Question } from '../../object/question';
import { Quiz } from '../../object/quiz';
import { Title } from '../template/title';

import '../../asset/css/page/create.scss';

interface AnswerInterface {
    name: string;
    setName: React.Dispatch<SetStateAction<string>>;
    isAnswer: boolean;
    setIsAnswer: React.Dispatch<SetStateAction<boolean>>;
    checkBoxRef: React.RefObject<HTMLInputElement>;
    inputRef: React.RefObject<HTMLInputElement>;
}

const Create = (): JSX.Element => {

    const [quiz, setQuiz] = useState<Quiz>(new Quiz());

    const {id} = useParams();

    const [isManyAnswers, setIsManyAnswers] = useState<boolean>(false);
    const isUniqueAnswer: boolean = useMemo(() => (!isManyAnswers), [isManyAnswers]);
    const [answerIndex, setAnswerIndex] = useState<number>(0);

    
    const [selectedIndexQuestion, setSelectedIndexQuestion] = useState<number>(-1);
    
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

    const [questionName, setQuestionName] = useState<string>('');

    // Si une question est séléctionnée, on met ses informations pour la modifier
    useEffect(() => {

        if (selectedIndexQuestion !== -1) {
            const question: Question = quiz.questions[selectedIndexQuestion];
            const questionAnswers: Answer[] = question.answers;

            setIsManyAnswers(!question.isUniqueAnswer);
            setQuestionName(question.name);

            answers.forEach((answer, index) => {
                if (index < questionAnswers.length) {
                    answer.setName(questionAnswers[index].name);
                    if (answer.inputRef.current !== null) {
                        answer.inputRef.current.value = questionAnswers[index].name;
                    }
                    answer.setIsAnswer(questionAnswers[index].isAnswer);
                } else {
                    answer.setName('');
                    answer.setIsAnswer(false);
                }
            });
        }

    }, [selectedIndexQuestion]);

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

            if (isUniqueAnswer) {
                answers.forEach((answer, index) => {
                    if (index === answerIndexTmp) {
                        answer.setIsAnswer(bool => !bool);
                    } else {
                        answer.setIsAnswer(false);
                    }
                })
            } else if (isManyAnswers) {
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

        let canAdd: boolean = 
            (correctAnswers > 0) && 
            ((isUniqueAnswer && (correctAnswers === 1)) 
                || 
            (isManyAnswers && (correctAnswers > 1))) 
            && (questionName !== undefined && questionName.length > 0);

        if (canAdd) {
            setQuiz((prevQuiz) => {
                let newQuiz: Quiz = Quiz.copy(prevQuiz);

                if (selectedIndexQuestion !== -1) {
                    newQuiz.replaceQuestion(selectedIndexQuestion, question);
                } else {
                    newQuiz.addQuestion(question);
                }

                return newQuiz;
            });

            // On désélectionne la question à modifier si il y en a une
            setSelectedIndexQuestion(-1);

            // On remet la valeur par défaut
            setAnswerIndex(0);
            setIsManyAnswers(false);

            e.currentTarget.reset();

            // Remettre tout à 0
            answers.forEach(answer => {
                answer.setIsAnswer(false);
                answer.setName('');
            });
        }

    }

    const [theme, setTheme] = useState<string>('');

    const handleSubmitQuiz = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {

        const canSubmit: boolean = 
        (theme !== undefined && theme.length !== 0)
        && (quiz.questions.length > 0);
        
        if (canSubmit) {
            quiz.setTheme(theme);
            // TODO: Envoyer le quiz au serveur
        } else {
            e.preventDefault();
        }
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
        <Menu>
            <>
                <Title text={ titleText } />
                <MainContainerPage>
                <>
                    <GreenContainer className="create-container theme-container flex-row align-center justify-start">
                            <>
                                <h1 className='no-bold'>Thème -</h1>
                                <InputText id={ "theme" } pattern={ initialRegex } value= { theme } setValue={ setTheme } name={ 'quiz-theme' }/>
                            </>
                    </GreenContainer>
                    <form style={{ width: '100%' }} onSubmit={ handleSubmitQuestion }>
                            <GreenContainer className="create-container new-question-container flex-column flex-center">
                            <>
                                    <div className="enter-question-container flex-row align-center justify-start">
                                    
                                        <h1 className='no-bold'>{ selectedIndexQuestion === -1 ? 'Nouvelle Question' : 'Modifier Question' } -</h1>
                                        <InputText pattern={ initialRegex } name={ 'question-name' } id={ "questionName" } value={ questionName } setValue={ setQuestionName } />

                                    </div>
                                    <div className='flex-row align-center justify-start' style={{ alignSelf: 'start', columnGap: '15px'}}>
                                        <label htmlFor='multipleAnswersCheckbox' style={{ fontSize: '1.1em', 'fontWeight': 300, 'cursor': 'pointer' }}>• Plusieurs réponses possibles ?</label>
                                        <InputCheckbox id={"multipleAnswersCheckbox"} onCheck={ setIsManyAnswers } checked={ isManyAnswers } name={'is-many-answers'} />
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
                                                    } ) } checked={ answer.isAnswer } ref={ answer.checkBoxRef } disabled={ true } name={ `ans-${i}-is-answer` } title={    answer.name.length > 0 ? 
                                                        'Séléctionner' :
                                                        'Veuillez entrer une réponse'
                                                    } />

                                                </div>
                                            )
                                        })}
                                    </div>
                                    <Button id="validateQuestion" onClick={ undefined } text="OK"/>
                                </>
                            </GreenContainer>
                        </form>
                        <GreenContainer className="create-container questions-container flex-column align-start justify-center">
                            <>
                                <h1 className='no-bold'>Questions du quizz :</h1>
                                <QuestionsRecap selectedIndex={ selectedIndexQuestion } setSelectedIndex={ setSelectedIndexQuestion } questions={ quiz.questions }/>
                            </>
                        </GreenContainer>
                        <div className="validate-button-container flex align-center justify-end">
                            <NavLink to="/" onClick={ handleSubmitQuiz }>
                                <Button id="validate" onClick={ undefined } text="Valider"/>
                            </NavLink>
                        </div>
                </>
                </MainContainerPage>
            </>
        </Menu>
    );
}

export default Create;