import Menu from "../menu";

import { Container } from "../template/container";
import { MainContainerPage } from "../template/main-container-page";
import { ResultLine } from "../template/result/result-line";
import { ResultLinesContainer } from "../template/result/result-lines-container";
import { Title } from "../template/title";

import "../../asset/css/page/result.scss";



const result = (): JSX.Element => {

    document.title = "Résultats : Pokemon";

    return (
        <Menu>
            <>
                <Title text="Résultats : Pokémon" />
                <MainContainerPage>
                        <Container className="result-container flex align-center">
                                <div className="result-container flex-column align-start">
                                    <ResultLine pseudo="Pseudo" score={10} maxScore={100} range={1}/>
                                    <ResultLine pseudo="Viggo" score={10} maxScore={14} range={2}/>
                                    <ResultLine pseudo="Masterclass" score={15} maxScore={10130} range={3}/>
                                    <ResultLinesContainer>
                                        <>
                                            <ResultLine pseudo="Viggo" score={10} maxScore={14} range={4}/>
                                            <ResultLine pseudo="Viggo" score={10} maxScore={14} range={5}/>
                                        </>
                                    </ResultLinesContainer>
                                    <ResultLinesContainer>
                                        <>
                                            <ResultLine pseudo="Viggo" score={10} maxScore={14} range={6}/>
                                            <ResultLine pseudo="Viggo" score={10} maxScore={14} range={7}/>
                                        </>
                                    </ResultLinesContainer>
                                </div>
                        </Container>
                </MainContainerPage>
            </>
        </Menu>
    );
};

export default result;