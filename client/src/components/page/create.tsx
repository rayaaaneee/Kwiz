import { SetStateAction, useContext, useMemo, useRef, useState, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import Menu from '../menu';

import { Question } from '../../object/entity/question';
import { Quiz } from '../../object/entity/quiz';

import cookieContext from '../../context/cookie-context';
import QuizEditor from '../template/create/quiz-editor';

import { createQuiz } from '../../function/api/create-quiz';
import verifyQuestion from '../../function/create/verifyQuestion';

import { ToastContextManager } from '../../object/toast-context-manager';
import { ToastType } from '../toast';
import { CookieInterface } from '../../interface/cookie-interface';

import toastContext from '../../context/toast-context';

import '../../asset/css/page/create.scss';
import verifyQuiz from '../../function/create/verifyQuiz';

export interface AnswerInterface {
    name: string;
    setName: React.Dispatch<SetStateAction<string>>;
    isAnswer: boolean;
    setIsAnswer: React.Dispatch<SetStateAction<boolean>>;
    checkBoxRef: React.RefObject<HTMLInputElement>;
    inputRef: React.RefObject<HTMLInputElement>;
}

const Create = (): JSX.Element => {

    let titleText: string = "Nouveau quiz"

    document.title = "Créer un quiz - Kwiz";

    const [loaded, setLoaded] = useState<boolean>(true);

    const navigate: NavigateFunction = useNavigate();

    const HandleUserIdCookie: CookieInterface = useContext(cookieContext).get('user_id');
    const HandleToasts: ToastContextManager = useContext(toastContext);

    const [quiz, setQuiz] = useState<Quiz>(new Quiz());

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

    const previousQuestions: React.MutableRefObject<AnswerInterface[]> = useRef<Array<AnswerInterface>>(answers);

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

        const isOk: boolean = verifyQuestion(
            answers,
            questionName !== undefined ? questionName.toString() : '',
            isUniqueAnswer.valueOf(),
            HandleToasts,
        );
        
        if (isOk) {
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

        const isOk: boolean = verifyQuiz(
            theme,
            quiz,
            HandleToasts,
        );

        if (isOk) {
            e.preventDefault();
            setLoaded(false);

            quiz.theme = theme;

            createQuiz(
                {
                    quiz: quiz,
                    creator_id: HandleUserIdCookie.get(),
                },
                (data) => {
                    setLoaded(true);
                    if (data.success === true) {
                        HandleToasts.push({
                            message: 'Quiz successfully created !',
                            type: ToastType.success,
                        });
                        navigate('/my-quizzes');
                    } else {
                        HandleToasts.push({
                            message: data.message,
                            type: ToastType.error,
                        });
                    }
                },
                (err) => {
                    setLoaded(true);
                    HandleToasts.push({
                        message: 'An error occured, please try again later.',
                        type: ToastType.error,
                    });
                }
            );
        } else {
            e.preventDefault();
        }
    }

    return (
        <Menu>
            <QuizEditor 
                titleText={ titleText }
                theme={ theme }
                setTheme={ setTheme }
                selectedIndexQuestion={ selectedIndexQuestion }
                setSelectedIndexQuestion={ setSelectedIndexQuestion }
                questionName={ questionName }
                setQuestionName={ setQuestionName }
                isManyAnswers={ isManyAnswers }
                isUniqueAnswer={ isUniqueAnswer }
                setIsManyAnswers={ setIsManyAnswers }
                answerIndex={ answerIndex }
                setAnswerIndex={ setAnswerIndex }
                quiz={ quiz }
                answers={ answers }
                previousQuestions={ previousQuestions }
                handleSubmitQuestion={ handleSubmitQuestion }
                handleSubmitQuiz={ handleSubmitQuiz } 
                loaded={ loaded }
            />
        </Menu>
    );
}

export default Create;