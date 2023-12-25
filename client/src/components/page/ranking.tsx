import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import Menu from "../menu";
import Loader, { LoaderColor } from "../loader";

import { Container } from "../template/container";
import { MainContainerPage } from "../template/main-container-page";
import { ResultLine } from "../template/result/result-line";
import { ResultLinesContainer } from "../template/result/result-lines-container";
import { Title } from "../template/title";

import { getQuizHistorical } from "../../function/api/get-quiz-historical";

import toastContext from "../../context/toast-context";
import { ToastContextManager } from "../../object/toast-context-manager";
import { ToastType } from "../toast";

import emptyImg from '../../asset/img/nothing.png';

import "../../asset/scss/page/result.scss";


const Ranking = (): JSX.Element => {

    const quiz_id: number = parseInt(useParams().id || '-1');

    const [loaded, setLoaded] = useState<boolean>(false);
    const [theme, setTheme] = useState<string>('');

    const HandleToasts: ToastContextManager = useContext(toastContext);

    interface RankInterface {
        score: number;
        maxScore: number;
        username: string;
    }

    const [ranks, setRank] = useState<RankInterface[]>([]);

    useEffect(() => {
        getQuizHistorical(
            quiz_id,
            (data) => {
                setRank(data.hist);
                setTheme(data.theme);
                setLoaded(true);
            },
            (err) => {
                HandleToasts.push({
                    message: "Failed to get quiz historical, please try again later.",
                    type: ToastType.error,
                })
            }
        )
    }, [])

    document.title = `Ranking : ${ theme }`;

    return (
        <Menu>
            <>
                <Title text={ document.title } />
                <MainContainerPage>
                    <Container className="result-container flex align-center">
                    { loaded ? (
                        <div className={`result-container flex-column align-start ${ ranks.length === 0 && 'flex-center' }`}>
                            { ranks.length === 0 ? (
                                <>
                                    <h2 style={{ margin: '0 auto'}}>No one has played this quiz yet.</h2>
                                    <img style={{ margin: '20px auto',}} width="160px" height="160px" src={ emptyImg } alt="empty" />
                                </>
                            ) : (
                                <>
                                    { ranks.slice(0, 3).map((rank, index) => {
                                        return (<ResultLine pseudo={rank.username} score={rank.score} maxScore={rank.maxScore} range={index + 1} />)
                                    })}
                                    { ranks.map((rank, index) => {
                                        if ((index - 3) % 2 === 0 && index > 2) {
                                            return (
                                              <ResultLinesContainer key={index / 2}>
                                                <ResultLine
                                                  pseudo={rank.username}
                                                  score={rank.score}
                                                  maxScore={rank.maxScore}
                                                  range={index + 1}
                                                />
                                                { ranks[index + 1] && (
                                                  <ResultLine
                                                    pseudo={ranks[index + 1].username}
                                                    score={ranks[index + 1].score}
                                                    maxScore={ranks[index + 1].maxScore}
                                                    range={index + 2}
                                                  />
                                                ) }
                                              </ResultLinesContainer>
                                            );
                                        } else if (index === ranks.length - 1 && index % 2 === 1) {
                                            return (
                                                <ResultLine
                                                    pseudo={rank.username}
                                                    score={rank.score}
                                                    maxScore={rank.maxScore}
                                                    range={index + 1}
                                                />)
                                        }
                                        return null;
                                    }) }
                                </>
                            ) }
                        </div>
                    ) : (
                        <div className="w-full h-full">
                            <Loader color={ LoaderColor.white } />
                        </div>
                    ) }
                    </Container>
                </MainContainerPage>
            </>
        </Menu>
    );
};

export default Ranking;