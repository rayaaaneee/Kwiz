export const ResultLine = (props: {pseudo: string, score: number, maxScore: number, range: number}): JSX.Element => {

    let range: string = "";
    switch (props.range) {
        case 1:
            range = "1er";
            break;
        case 2:
            range = "2ème";
            break;
        case 3:
            range = "3ème";
            break;
        default:
            range = props.range + "ème";
            break;
    }

    return (
        <div className="result-line flex flex-column align-center">
            <div className="result-line-range">
                <p>{range}</p>
            </div>
            <div className="result-line-pseudo">
                <p>{props.pseudo}</p>
            </div>
            <div className="result-line-score">
                <p>{props.score}/{props.maxScore}</p>
            </div>
        </div>
    );
};