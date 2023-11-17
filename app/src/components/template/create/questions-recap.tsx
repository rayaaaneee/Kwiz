import { Question as QuestionObject } from "../../../object/question";
import { Question } from "./question";
import { useState } from "react";

interface QuestionRecapInterface {
    questions: QuestionObject[];
}

export const QuestionsRecap = (props: QuestionRecapInterface) => {

    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    const handleClick = (index: number) => {
        setSelectedIndex(index);
    }

    return (
    <div className="questions-recap flex flex-column">
        { props.questions.length === 0 && 
            (<p style={{ cursor: 'default' }}>Aucune question n'a été ajoutée</p>) 
        }
        {props.questions.map((question, index) => {
            index += 1;
            return (
            <Question key={index} index={index} question={ question.name } selectedIndex={selectedIndex} onClick={handleClick} />
            )}
        )}
    </div>
    );
}