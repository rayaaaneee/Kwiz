import { GreenContainer } from "../template/green-container";
import { MainContainerPage } from "../template/main-container-page";

const Quiz = (): JSX.Element => {

    document.title = "Quiz : Pokemon";
    return (
        <>
            <GreenContainer className="title-container" children={
                <h1>{document.title}</h1>
            }/>
            <MainContainerPage children={
                <>
                    <GreenContainer className="question-container" children={
                        <h2>Question 1 : </h2>
                    } />
                    <GreenContainer className="answer-container" children={
                        <h1>Réponse 1</h1>
                    } />
                </>
            }/>
        </>
    );
};

export default Quiz;