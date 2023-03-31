import '../../../css/template/historical/historic-line.css';

export const HistoricLine = (props : {pseudo: string, quizName: string, score: string, date : string, maxScore : string}): JSX.Element => {
    return (
        <div className="historic-line flex-row flex-center align-start">
            <h1><strong>{props.pseudo}</strong> a joué à <strong>{props.quizName}</strong> et a obtenu <strong>{props.score}</strong> points sur <strong>{props.maxScore}</strong> le <strong>{props.date}</strong> !</h1>
        </div>
    );
}