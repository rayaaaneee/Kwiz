import { useContext, useEffect, useState } from 'react';

import Menu from '../menu';

import { Container } from '../template/container';
import { MainContainerPage } from '../template/main-container-page';
import { HistoricLine, HistoricLineInterface } from '../template/historical/historic-line';
import { Title } from '../template/title';

import toastContext from '../../context/toast-context';
import cookieContext from '../../context/cookie-context';

import { getUserHistorical } from '../../function/api/get-user-historical';

import { ToastContextManager } from '../../object/toast-context-manager';
import { ToastType } from '../toast';
import Loader, { LoaderColor } from '../loader';

const MyHistorical = (): JSX.Element => {

    document.title = "My Historical - Kwiz";

    const [historicLines, setHistoricLines] = useState<Array<HistoricLineInterface>>([]);

    const HandleUserIdCookie = useContext(cookieContext).get('user_id');
    const HandleToasts: ToastContextManager = useContext(toastContext);

    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        getUserHistorical(
            HandleUserIdCookie.get(),
            (data) => {
                if (data.success) {
                    setLoaded(true);
                    setHistoricLines(data.historical);
                } else {
                    HandleToasts.push({
                        message: data.message,
                        type: ToastType.error
                    });
                }
            },
            (err) => {
                HandleToasts.push({
                    message: 'Cannot get historical, please try again later.',
                    type: ToastType.error
                });
            }
        );
    }, []);
    return (
        <Menu>
            <>
                <Title text="My Historical" />
                <MainContainerPage>
                    <Container className="play-container flex align-center" style={ !loaded ? { height: '300px' } : undefined }>
                        { loaded ? (
                            <div className="historic-line-container flex-column align-start">
                                { historicLines.map((historicLine) => (
                                    <HistoricLine username={historicLine.username} theme={historicLine.theme} score={historicLine.score} maxScore={historicLine.maxScore} date={historicLine.date}/>
                                )) }
                            </div>
                        ) : (
                            <Loader color={ LoaderColor.white } />
                        ) }
                    </Container>
                </MainContainerPage>
            </>
        </Menu>
    );
}

export default MyHistorical;