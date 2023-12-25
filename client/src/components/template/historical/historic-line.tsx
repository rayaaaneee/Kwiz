import '../../../asset/scss/template/historical/historic-line.scss';

export interface HistoricLineInterface {
    username: string, 
    theme: string, 
    score: string, 
    date : string, 
    maxScore : string
}

export const HistoricLine = (props : HistoricLineInterface): JSX.Element => {
    return (
        <div className="historic-line flex-row flex-center align-start">
            <h1><strong>{props.username}</strong> played <strong>{props.theme}</strong> and obtained <strong>{props.score}</strong> out of <strong>{props.maxScore}</strong> the <strong>{props.date}</strong> !</h1>
        </div>
    );
}