import { GreenContainer } from "../template/green-container";
import { MainContainerPage } from "../template/main-container-page";
import { ResultLine } from "../template/result/result-line";

import "../../css/page/result.css";
import { ResultLinesContainer } from "../template/result/result-lines-container";


const result = (): JSX.Element => {

    document.title = "Résultats : Pokemon";

    return (
        <>
            <GreenContainer className="play-container" children={
                <h1>Résultats : Pokemon</h1>
            }/>
            <MainContainerPage children={
                <>
                    <GreenContainer className="result-container flex align-center" children={
                        <>
                            <div className="result-container flex-column align-start">
                                <ResultLine pseudo="Pseudo" score={10} maxScore={100} range={1}/>
                                <ResultLine pseudo="Viggo" score={10} maxScore={14} range={2}/>
                                <ResultLine pseudo="Masterclass" score={15} maxScore={10130} range={3}/>
                                <ResultLinesContainer children={
                                    <>
                                        <ResultLine pseudo="Viggo" score={10} maxScore={14} range={4}/>
                                        <ResultLine pseudo="Viggo" score={10} maxScore={14} range={5}/>
                                    </>
                                }/>
                                <ResultLinesContainer children={
                                    <>
                                    <ResultLine pseudo="Viggo" score={10} maxScore={14} range={6}/>
                                    <ResultLine pseudo="Viggo" score={10} maxScore={14} range={7}/>
                                    </>
                                } />
                            </div>
                        </>
                    }/>
                </>
            }/>
        </>
    );
};

export default result;