import '../../css/page/historical.css';
import { GreenContainer } from '../template/green-container';
import { MainContainerPage } from '../template/main-container-page';
import { HistoricLine } from '../template/historical/historic-line';

 const Historical = (): JSX.Element => {

    document.title = "Historique - Kwiz";
    return (
        <>
            <GreenContainer className="play-container" children={
                <h1>Historique</h1>
            }/>
            <MainContainerPage children={
                <>
                    <GreenContainer className="play-container flex align-center" children={
                        <>
                        <div className="historic-line-container flex-column align-start">
                            <HistoricLine pseudo="Pseudo" quizName="Quiz 1" score="10" maxScore="100" date="01/01/2021"/>
                            <HistoricLine pseudo="Viggo" quizName="Pokemon" score="10" maxScore="14" date="01/01/2021"/>
                        </div>
                        </>
                    }/>
                </>
            }/>
        </>
    );
}

export default Historical;