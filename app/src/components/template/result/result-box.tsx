export const ResultBox = (props: {pseudo: string, score: number, maxScore: number, range: number}): JSX.Element => {

    let range: string = "";
    switch (props.range) {
        case 1:
            range = "1er";
            break;
        default:
            range = props.range + "ème";
            break;
    }

    let className: string = "";
    switch (props.range) {
        case 1:
            className = "result-box-1st";
            break;
        case 2:
            className = "result-box-2nd";
            break;
        case 3:
            className = "result-box-3rd";
            break;
        default:
            className = "result-box-4th-more";
            break;
    }
    return (
    <div className={className + " result-box flex flex-column align-center"}>
        <div className="result-box-range">
            <p>{range}</p>
        </div>
        <div className="result-box-pseudo">
            <p>{props.pseudo}</p>
        </div>
        <div className="result-box-score">
            <p>{props.score}/{props.maxScore}</p>
        </div>
    </div>
    );
}