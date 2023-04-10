import { NavLink } from "react-router-dom";

export const ViewQuiz = (props: { quizName : string, quizQuestions : string , selected : string, selectQuiz : (name: string) => void}): JSX.Element => {
    return (
        <div className={`view-quiz-container flex-row align-center justify-start ${props.selected === props.quizName ? 'selected' : ''}`} onClick={() => props.selectQuiz(props.quizName)}>
            <h1 className="view-quiz-title">{props.quizName} - {props.quizQuestions} questions</h1>
            <div className="modify-quiz-container flex-column">
                <NavLink to="/new/1" className="modify-quiz">
                    Modifier
                </NavLink>
                <NavLink to="/result/1" className="modify-quiz">
                    Résultats
                </NavLink>
            </div>
        </div>
    );
};