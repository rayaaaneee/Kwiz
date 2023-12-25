
import { useState } from 'react';

import Menu from '../menu';

import { Container } from '../template/container';
import { MainContainerPage } from '../template/main-container-page';
import { Title } from '../template/title';
import Loader, { LoaderColor } from '../loader';


const MyFriends = (): JSX.Element => {

    document.title = "My friends - Kwiz";

    const [loaded, setLoaded] = useState<boolean>(false);

    return (
        <Menu>
            <>
                <Title text="Friends" />
                <MainContainerPage>
                    <Container className="play-container flex align-center" style={ !loaded ? { height: '300px' } : undefined }>
                        { loaded ? (
                            <></>
                        ) : (
                            <Loader color={ LoaderColor.white } />
                        ) }
                    </Container>
                </MainContainerPage>
            </>
        </Menu>
    );
}

export default MyFriends;