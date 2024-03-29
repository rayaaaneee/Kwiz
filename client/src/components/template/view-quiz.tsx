import { NavLink } from "react-router-dom";

interface ViewQuizInterface { 
    quizName : string, 
    selected : number, 
    selectQuiz : React.Dispatch<React.SetStateAction<number>>,
    nbQuestions : number, 
    quizId: number,

    canModify? : boolean
}

export const ViewQuiz = ({ quizName, nbQuestions, selected, selectQuiz, canModify = false, quizId }: ViewQuizInterface): JSX.Element => {
    return (
        <div className={`view-quiz-container flex-row align-center justify-start ${ selected === quizId ? 'selected' : ''}`} onClick={() => selectQuiz(quizId)}>
            <h1 className="view-quiz-title">{ quizName } - { nbQuestions.toString() } question{ nbQuestions > 1 && 's'}</h1>
                <div className="modify-quiz-container flex-column">
                    { canModify && (
                        <NavLink to={`/edit/${ quizId }`} className="modify-quiz">
                            Modify
                        </NavLink>
                    ) }
                    <NavLink to={`/ranking/${ quizId }`} className="modify-quiz">
                        Ranking
                    </NavLink>
                </div>
        </div>
    );
};