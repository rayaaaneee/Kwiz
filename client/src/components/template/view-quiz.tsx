import { NavLink } from "react-router-dom";

interface ViewQuizInterface { 
    quizName : string, 
    quizQuestions : string , 
    selected : string, 
    selectQuiz : (name: string) => void,

    canModify? : boolean
}

export const ViewQuiz = ({ quizName, quizQuestions, selected, selectQuiz, canModify = false }: ViewQuizInterface): JSX.Element => {
    return (
        <div className={`view-quiz-container flex-row align-center justify-start ${ selected === quizName ? 'selected' : ''}`} onClick={() => selectQuiz(quizName)}>
            <h1 className="view-quiz-title">{quizName} - {quizQuestions} questions</h1>
            { canModify && (
                <>
                    <div className="modify-quiz-container flex-column">
                        <NavLink to="/new/1" className="modify-quiz">
                            Modifier
                        </NavLink>
                        <NavLink to="/result/1" className="modify-quiz">
                            Résultats
                        </NavLink>
                    </div>
                </>
            ) }
        </div>
    );
};