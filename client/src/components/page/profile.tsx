import Menu from "../menu";

import { GreenContainer } from "../template/green-container";
import { InputText } from "../template/input-text";
import { MainContainerPage } from "../template/main-container-page";
import { Title } from "../template/title";

import { Button } from "../template/button";

const Profile = () => {

    const globalStyle: React.CSSProperties = {
        marginLeft: '70px',
    }
    return (
        <Menu>
            <MainContainerPage>
                <>
                    <Title text="My profile"/>
                    <GreenContainer className="flex flex-column flex-center">
                        <>
                            <div style={{...globalStyle }} className="enter-question-container flex-row align-center justify-start">
                                <h2 className='no-bold'>Username -</h2>
                                <InputText id={ "theme" } value={ '' } setValue={ () => {} } name={ 'username' }/>
                            </div>
                            <div style={{ ...globalStyle }} className="enter-question-container flex-row align-center justify-start">
                                <h2 className='no-bold'>Password -</h2>
                                <InputText type="password" id={ "theme" } value={ '' } setValue={ () => {} } name={ 'username' }/>
                            </div>
                        </>
                    </GreenContainer>
                    <Button text="Save" onClick={ () => {} }/>
                </>
            </MainContainerPage>
        </Menu>
    )
};

export default Profile;