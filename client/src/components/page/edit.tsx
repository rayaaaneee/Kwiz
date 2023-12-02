import { SetStateAction, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import Menu from '../menu';

import { Question } from '../../object/entity/question';
import { Quiz } from '../../object/entity/quiz';

import cookieContext from '../../context/cookie-context';
import QuizEditor from './quiz-editor';

import '../../asset/css/page/create.scss';

export interface AnswerInterface {
    name: string;
    setName: React.Dispatch<SetStateAction<string>>;
    isAnswer: boolean;
    setIsAnswer: React.Dispatch<SetStateAction<boolean>>;
    checkBoxRef: React.RefObject<HTMLInputElement>;
    inputRef: React.RefObject<HTMLInputElement>;
}

const Edit = (): JSX.Element => {

    let titleText: string = "Modifier un quiz";
    document.title = "Modifier un quiz - Kwiz";

    const {id} = useParams();

    const [loaded, setLoaded] = useState<boolean>(false);

    // On affecte le quiz
    useEffect(() => {
        fetch(`http://localhost:7000/quiz/${id}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            if (data.success === true) {
                setTheme(data.quiz);
                console.log(data.quiz);
                /* console.log(Quiz.copy(data.quiz)); */
                /* setQuiz(Quiz.copy(data.quiz)); */
                setLoaded(true);
            }
        });
    }, []);


    const HandleUserIdCookie = useContext(cookieContext).get('user_id');

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

    const [theme, setTheme] = useState<string>('');

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

        // Vérifier si la question a des réposnes correctes
        let correctAnswers: number = answers.filter(answer => answer.isAnswer === true).length;

        let canAdd: boolean = 
            (correctAnswers > 0) && 
            ((isUniqueAnswer && (correctAnswers === 1)) 
                || 
            (isManyAnswers && (correctAnswers > 1))) 
            && (questionName !== undefined && questionName.length > 0);

        if (canAdd) {
            setQuiz((prevQuiz: any) => {
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

    const handleSubmitQuiz = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {

        const canSubmit: boolean = 
        (theme !== undefined && theme.length !== 0)
        && (quiz.questions.length > 0);
        
        if (canSubmit) {
            quiz.theme = theme;

            fetch('http://localhost:7000/quiz/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quiz: quiz,
                    creator_id: HandleUserIdCookie.get(),
                }),
            }).then(res => res.json()).then(data => {
                console.log(data);
                if (data.success === true) {
                }
            });
        } else {
            e.preventDefault();
        }
    }

    return (
        <Menu>
            { loaded ? 
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
                />
                :
                <div className="loading">
                    <div className="loading__container">
                        <div className="loading__container__circle"></div>
                        <div className="loading__container__circle"></div>
                        <div className="loading__container__circle"></div>
                    </div>
                </div>
            }
        </Menu>
    );
}

export default Edit;