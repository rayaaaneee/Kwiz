import { Container } from "../template/container";
import { MainContainerPage } from "../template/main-container-page";
import { Title } from "../template/title";

const Score = (): JSX.Element  => {
    return (
        <>
            <Title text="Score" />
            <MainContainerPage>
                <Container className="play-container flex align-center">
                    <>
                    </>
                </Container>
            </MainContainerPage>
        </>
    );
}

export default Score;