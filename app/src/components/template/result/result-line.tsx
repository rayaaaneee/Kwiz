import { ResultBox } from "./result-box";

export const ResultLine = (props: {pseudo: string, score: number, maxScore: number, range: number}): JSX.Element => {
    return (
        <div className="result-line flex flex-row align-center justify-center">
            <ResultBox pseudo={props.pseudo} score={props.score} maxScore={props.maxScore} range={props.range}/>
        </div>
    );
};