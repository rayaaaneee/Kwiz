import Menu from "../menu";

import { Container } from "../template/container";
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
                        <Container className="question-container">
                            <h2>Question 1 : </h2>
                        </Container>
                        <Container className="answer-container">
                            <h1>Réponse 1</h1>
                        </Container>
                    </>
                </MainContainerPage>
            </>
        </Menu>
    );
};

export default Quiz;