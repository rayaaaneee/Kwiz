import { GreenContainer } from "../template/green-container";
import { MainContainerPage } from "../template/main-container-page";
import { Title } from "../template/title";

const Score = (): JSX.Element  => {
    return (
        <>
            <Title text="Score" />
            <MainContainerPage>
                <GreenContainer className="play-container flex align-center">
                    <>
                    </>
                </GreenContainer>
            </MainContainerPage>
        </>
    );
}

export default Score;