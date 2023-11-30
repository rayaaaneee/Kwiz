import { ChildrenInterface } from "../../../interface/children-interface";

export const ResultLinesContainer = (props: ChildrenInterface): JSX.Element => {
    return (
        <div className="result-line-container-3th-more flex flex-row align-center justify-evenly">
            {props.children}
        </div>
    );
};