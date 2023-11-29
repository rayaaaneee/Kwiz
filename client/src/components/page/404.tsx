import Menu from "../menu";

import { GreenContainer } from "../template/green-container";
import { MainContainerPage } from "../template/main-container-page";
import { Title } from "../template/title";

const P404 = () => (
    <Menu>
        <MainContainerPage>
            <>
                <Title text="404 Page not found"/>
                <GreenContainer>
                    <div className="flex flex-start flex-column">
                        <h2>This page doesn't exists.</h2>
                    </div>
                </GreenContainer>
            </>
        </MainContainerPage>
    </Menu>
);

export default P404;