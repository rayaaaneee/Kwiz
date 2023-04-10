import { InputCheckbox } from "./input-checkbox";

export const Answer = (props : {index: number}): JSX.Element => {
    return (
        <div className="answer-container flex flex-center">
            <p>{props.index} - </p>
            <input type="text" placeholder="Answer" />
            <InputCheckbox id={`checkbox${props.index}`} value="checkbox" />
        </div>
    );
}