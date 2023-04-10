import { Question } from "./question";
import { useState } from "react";

export const QuestionsRecap = () => {

    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    const handleClick = (index: number) => {
        setSelectedIndex(index);
    }

    return (
    <div className="questions-recap flex flex-column">
        {[...Array(10)].map((_, index) => {
            index += 1;
            return (
            <Question key={index} index={index} question={"Ceci est une question ma fois interessante ?"} selectedIndex={selectedIndex} onClick={handleClick} />
            )}
        )}
    </div>
    );
}