import { GreenContainer } from "../template/green-container";
import { MainContainerPage } from "../template/main-container-page";

const Score = (): JSX.Element  => {
    return (
        <>
            <GreenContainer className="play-container" children={
                <h1>Score</h1>
            }/>
            <MainContainerPage children={
                <>
                    <GreenContainer className="play-container flex align-center" children={<></>} />
                </>
            }/>
        </>
    );
}

export default Score;