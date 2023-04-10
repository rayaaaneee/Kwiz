import { GreenContainer } from "../template/green-container";
import { MainContainerPage } from "../template/main-container-page";
import { ResultLine } from "../template/result/result-line";


const result = (): JSX.Element => {
    return (
        <>
            <GreenContainer className="play-container" children={
                <h1>Résultats : Pokemon</h1>
            }/>
            <MainContainerPage children={
                <>
                    <GreenContainer className="play-container flex align-center" children={
                        <>
                            <div className="result-container flex-column align-start">
                                <ResultLine pseudo="Pseudo" score={10} maxScore={100} range={1}/>
                                <ResultLine pseudo="Viggo" score={10} maxScore={14} range={2}/>
                                <ResultLine pseudo="Masterclass" score={15} maxScore={10130} range={3}/>
                                <div className="result-line-container-3th-more flex flex-row align-center justify-center">
                                    <ResultLine pseudo="Viggo" score={10} maxScore={14} range={4}/>
                                    <ResultLine pseudo="Viggo" score={10} maxScore={14} range={5}/>
                                </div>
                                <div className="result-line-container-3th-more flex flex-row align-center justify-center">
                                    <ResultLine pseudo="Viggo" score={10} maxScore={14} range={6}/>
                                    <ResultLine pseudo="Viggo" score={10} maxScore={14} range={7}/>
                                </div>
                            </div>
                        </>
                    }/>
                </>
            }/>
        </>
    );
};

export default result;