import { useEffect } from 'react';

import Menu from '../menu';

import { GreenContainer } from '../template/green-container';
import { MainContainerPage } from '../template/main-container-page';
import { HistoricLine } from '../template/historical/historic-line';
import { Title } from '../template/title';

import '../../asset/css/page/historical.scss';

 const Historical = (): JSX.Element => {
    document.title = "Historique - Kwiz";
    return (
        <Menu>
            <>
                <Title text="Historique" />
                <MainContainerPage>
                    <GreenContainer className="play-container flex align-center">
                        <div className="historic-line-container flex-column align-start">
                            <HistoricLine pseudo="Pseudo" quizName="Quiz 1" score="10" maxScore="100" date="01/01/2021"/>
                            <HistoricLine pseudo="Viggo" quizName="Pokemon" score="10" maxScore="14" date="01/01/2021"/>
                        </div>
                    </GreenContainer>
                </MainContainerPage>
            </>
        </Menu>
    );
}

export default Historical;