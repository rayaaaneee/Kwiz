import { FormEvent, useContext, useEffect, useState } from "react";
import Menu from "../menu";

import { GreenContainer } from "../template/green-container";
import { InputText } from "../template/input-text";
import { MainContainerPage } from "../template/main-container-page";
import { Title } from "../template/title";

import { Button } from "../template/button";
import { CookieInterface } from "../../interface/cookie-interface";
import cookieContext from "../../context/cookie-context";
import { ToastContextManager } from "../../object/toast-context-manager";
import toastContext from "../../context/toast-context";
import { ToastType } from "../toast";
import Loader, { LoaderColor } from "../loader";
import { getUserInformations } from "../../function/api/get-user-informations";

import { setUsername as fetchSetUsername } from "../../function/api/set-username";
import { setPassword as fetchSetPassword } from "../../function/api/set-password";

const Profile = () => {

    const globalStyle: React.CSSProperties = {
        marginLeft: '70px',
        overflow: 'hidden',
    }

    const HandleUserIdCookie: CookieInterface = useContext(cookieContext).get('user_id');
    const HandleToasts: ToastContextManager = useContext(toastContext);

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmed, setConfirmedPassword] = useState<string>('');

    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        getUserInformations(
            HandleUserIdCookie.get(),
            (data) => {
                if (data.success === true) {
                setUsername(data.user.username);
                } else {
                    HandleToasts.push({
                        message: 'Error while fetching user data',
                        type: ToastType.error,
                    });
                }
                setLoaded(true);
            },
            (error) => {
                HandleToasts.push({
                    message: 'Error while fetching user data',
                    type: ToastType.error,
                }
            );
        });
    }, []);

    const HandleSubmitUsername = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchSetUsername(
            username, HandleUserIdCookie.get(), 
            (data) => {
                HandleToasts.push({
                    message: data.message,
                    type: data.success ? ToastType.success : ToastType.error,
                });
            }, 
            (_) => {
                HandleToasts.push({
                    message: 'Cannot update username, please try again later',
                    type: ToastType.error,
                });
            }
        );
    }

    const HandleSubmitPassword = (e: FormEvent<HTMLFormElement>) => {
        setPassword('');
        e.currentTarget.reset();
        e.preventDefault();

        if (password !== confirmed) {
            return HandleToasts.push({
                message: 'Passwords are not the same',
                type: ToastType.error,
            });
        }

        fetchSetPassword(
            password, HandleUserIdCookie.get(), 
            (data) => {
                HandleToasts.push({
                    message: data.message,
                    type: data.success ? ToastType.success : ToastType.error,
                });
            }, 
            (_) => {
                HandleToasts.push({
                    message: 'Cannot update password, please try again later',
                    type: ToastType.error,
                });
            }
        );
    }

    return (
        <Menu>
            <MainContainerPage>
                <>
                    <Title text="My profile"/>
                    <GreenContainer className="flex flex-column flex-center" style={{ height: '200px', padding: '20px 0' }}>
                        <>
                        { loaded ? (
                            <>
                                <form style={{...globalStyle }} onSubmit={ HandleSubmitUsername } className="enter-question-container flex-row align-center justify-start">
                                    <h2 className='no-bold'>Username -</h2>
                                    <InputText id={ "theme" } value={ username } setValue={ setUsername } name={ 'username' }/>
                                    <Button text="Save" />
                                </form>
                                <div style={{ ...globalStyle, marginTop: '20px' }} className="enter-question-container flex-row align-center justify-start">
                                    <h2 className='no-bold'>Password -</h2>
                                    <InputText placeholder={ "New password" } type="password" id={ "theme" } value={ password } setValue={ setPassword } name={ 'username' }/>
                                </div>
                                <form style={{ ...globalStyle }} className="enter-question-container flex-row align-center justify-start" onSubmit={ HandleSubmitPassword }>
                                    <h2 className='no-bold'>Confirm -</h2>
                                    <InputText type="password" id={ "theme" } value={ confirmed } placeholder={"Confirm new password"} setValue={ setConfirmedPassword } name={ 'username' }/>
                                    <Button text="Save" onClick={ () => {} }/>
                                </form>
                            </>
                        ) : (
                            <Loader color={ LoaderColor.white }/>
                        ) }
                        </>
                    </GreenContainer>
                </>
            </MainContainerPage>
        </Menu>
    )
};

export default Profile;