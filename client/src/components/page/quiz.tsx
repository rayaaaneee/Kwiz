import Menu from "../menu";

import { GreenContainer } from "../template/green-container";
import { MainContainerPage } from "../template/main-container-page";
import { Title } from "../template/title";

const Quiz = (): JSX.Element => {

    document.title = "Quiz : Pokemon";

    return (
        <Menu>
            <>
                <Title text={ document.title } />
                <MainContainerPage>
                    <>
                        <GreenContainer className="question-container">
                            <h2>Question 1 : </h2>
                        </GreenContainer>
                        <GreenContainer className="answer-container">
                            <h1>Réponse 1</h1>
                        </GreenContainer>
                    </>
                </MainContainerPage>
            </>
        </Menu>
    );
};

export default Quiz;