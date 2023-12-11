import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";

import Menu from "../menu";
import Confirm from "../confirm";

import { Container } from "../template/container";
import { InputText } from "../template/input-text";
import { MainContainerPage } from "../template/main-container-page";
import { Title } from "../template/title";

import { Button, ButtonColor } from "../template/button";
import { CookieInterface } from "../../interface/cookie-interface";
import cookieContext from "../../context/cookie-context";
import { ToastContextManager } from "../../object/toast-context-manager";
import toastContext from "../../context/toast-context";
import { ToastType } from "../toast";
import Loader, { LoaderColor } from "../loader";
import { getUserInformations } from "../../function/api/get-user-informations";

import { setUsername as fetchSetUsername } from "../../function/api/set-username";
import { setPassword as fetchSetPassword } from "../../function/api/set-password";
import { deleteUser } from "../../function/api/delete-user";

const Profile = () => {

    document.title = "My profile - Kwiz";

    const location = useLocation();
    const navigate: NavigateFunction = useNavigate();

    const globalStyle: React.CSSProperties = {
        marginLeft: '70px',
        overflow: 'hidden'
    }

    const HandleUserIdCookie: CookieInterface = useContext(cookieContext).get('user_id');
    const HandleToasts: ToastContextManager = useContext(toastContext);

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmed, setConfirmedPassword] = useState<string>('');
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    interface ConfirmStateInterface {
        isOpen: boolean;
        message?: string;
        onConfirm?: React.MouseEventHandler<HTMLButtonElement>;
    }
    const [confirmState, setConfirmState] = useState<ConfirmStateInterface>({
        isOpen: false,
    });

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

        setConfirmState({
            isOpen: true,
            message: 'Enter your password to confirm username change',
            onConfirm: 
                (e) => {
                    fetchSetUsername(
                        username, 
                        currentPasswordInput.current!.value, 
                        HandleUserIdCookie.get(),
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
                    )
                }
        });
    }

    const HandleSubmitPassword = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmed) {
            e.currentTarget.reset();
            setPassword('');
            HandleToasts.push({
                message: 'Passwords do not match',
                type: ToastType.error,
            });
            return;
        }

        setConfirmState({
            isOpen: true,
            message: 'Enter your password to confirm account deletion',
            onConfirm: () => {
                fetchSetPassword(
                    password, 
                    currentPasswordInput.current!.value, 
                    HandleUserIdCookie.get(), 
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
        });
    }

    const HandleDeleteAccount = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setConfirmState({ 
            isOpen: true, 
            message: 'Enter your current password to delete your account',
            onConfirm: () => {
                deleteUser(
                    HandleUserIdCookie.get(),
                    currentPasswordInput.current!.value,
                    (data) => {
                        if (data.success) {
                            HandleToasts.push({
                                message: 'Your account has been deleted',
                                type: ToastType.info,
                            });
                            HandleUserIdCookie.delete();
                            navigate('/', { state: { from: location.pathname } });
                        } else {
                            HandleToasts.push({
                                message: data.message,
                                type: ToastType.error,
                            });
                        }
                    },
                    (_) => {
                        HandleToasts.push({
                            message: 'Cannot delete account, please try again later',
                            type: ToastType.error,
                        });
                    }
                );
            }
        });
    }

    return (
        <Menu>
            <MainContainerPage>
                <>
                    { confirmState.isOpen && (
                        <Confirm message={ confirmState.message } onConfirm={ (e) => {
                            confirmState.onConfirm && confirmState.onConfirm(e);
                            setConfirmState({ isOpen: false });
                            currentPasswordInput.current!.value = '';
                        } } onCancel={ (e) => {
                            setConfirmState({ isOpen: false });
                            currentPasswordInput.current!.value = '';
                        } }>
                            <InputText style={{ textAlign: 'center' }} ref={ currentPasswordInput } type="password" placeholder="enter password" />
                        </Confirm>
                    ) }
                    <Title text="My profile"/>
                    <Container className="flex flex-column flex-center" style={{ height: '330px', padding: '20px 0' }}>
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
                                    <Button text="Save"/>
                                </form>
                                <Button style={{ marginTop: '20px' }} text="Delete my account" color={ ButtonColor.red } className="delete-account-button" onClick={ HandleDeleteAccount }/>
                            </>
                        ) : (
                            <Loader color={ LoaderColor.white }/>
                        ) }
                        </>
                    </Container>
                </>
            </MainContainerPage>
        </Menu>
    )
};

export default Profile;