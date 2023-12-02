import { useState } from "react";

import { Question } from "./question";

import { Question as QuestionObject } from "../../../object/entity/question";

interface QuestionRecapInterface {
    questions: QuestionObject[];
    selectedIndex: number;
    setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const QuestionsRecap = (props: QuestionRecapInterface) => {

    const handleClick = (index: number) => {
        props.setSelectedIndex(index);
    }

    return (
    <div className="questions-recap flex flex-column">
        { props.questions.length === 0 && 
            (<p style={{ cursor: 'default' }}>Aucune question n'a été ajoutée</p>) 
        }
        {props.questions.map((question, index) =>
            (<Question key={index} index={index} question={ question.question_text } selectedIndex={props.selectedIndex} onClick={handleClick} />)
        )}
    </div>
    );
}