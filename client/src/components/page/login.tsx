import { forwardRef, useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Loader, { LoaderColor } from "../loader";

import { GreenContainer } from "../template/green-container";
import { InputText } from "../template/input-text";
import { Button } from "../template/button";
import { Title } from "../template/title";

import cookieContext from "../../context/cookie-context";
import toastContext from "../../context/toast-context";

import { CookieInterface } from "../../interface/cookie-interface";
import { ToastType } from "../toast";

import { login } from "../../function/api/login";
import { register } from "../../function/api/register";
import { ToastContextManager } from "../../object/toast-context-manager";


interface FlexColumnDivTemplateInterface {
    field: string,
    username: string,
    setUsername: React.Dispatch<React.SetStateAction<string>>,
    password: string,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    onSubmit: React.FormEventHandler<HTMLFormElement>,
}

const FlexColumnDivTemplate = (props: FlexColumnDivTemplateInterface): JSX.Element => {
    return (
        <form onSubmit={ props.onSubmit }>
            <div className="flex flex-column" style={{ rowGap: '20px', fontSize: '20px', fontWeight: 'lighter' }}>
                <h1 style={{ textAlign: 'center' }}>{ props.field }</h1>
                <InputText value={ props.username } setValue={ props.setUsername } placeholder="Username"></InputText>
                <InputText value={ props.password } setValue={ props.setPassword } placeholder="Password" type="password"></InputText>
                <Button text="Ok"/>
            </div>
        </form>
    )
};

const Login = (): JSX.Element => {

    document.title = "Kwiz - Let's quiz !";

    const location = useLocation();
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [registerUsername, setRegisterUsername] = useState<string>('');
    const [registerPassword, setRegisterPassword] = useState<string>('');

    const HandleUserIdCookie: CookieInterface = useContext(cookieContext).get('user_id');
    const HandleToasts: ToastContextManager = useContext(toastContext);

    const [loaded, setLoaded] = useState(true);

    const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        setLoaded(false);

        e.currentTarget.reset();

        register(
            {
                username: registerUsername,
                password: registerPassword,
            },
            data => {
                if (data.success === true) {
                    HandleToasts.push({
                        message: 'You have been registered !',
                        type: ToastType.success,
                    });
                    HandleUserIdCookie.set(data.id);
                    navigate('/', { state: { from: location.pathname } });
                } else {
                    HandleToasts.push({
                        message: data.message,
                        type: ToastType.error,
                    });
                    setLoaded(true);
                }
            }
        );
    }

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoaded(false);

        login(
            {
                username: username,
                password: password,
            },
            (data) => {
                if (data.success === true) {
                    HandleToasts.push({
                        message: 'You have been logged in !',
                        type: ToastType.info,
                    });
                    HandleUserIdCookie.set(data.id);
                    navigate('/', { state: { from: location.pathname } });
                } else {
                    HandleToasts.push({
                        message: data.message,
                        type: ToastType.error,
                    });
                    setLoaded(true);
                }
            }
        );

        navigate('/', { state: { from: location.pathname } });
    }

    return (
        <article className="w-full h-full flex flex-column">
            <GreenContainer isBlue={ false } className="no-border-radius" style={{ height: '70px', position: "absolute", top: 0 }}>
                <></>
            </GreenContainer>
            <div className="flex flex-column align-center justify-center h-full" style={{ rowGap: '40px' }}>
                { loaded ? (
                    <>
                        <Title text="Start with Kwiz !" style={{ width: '1000px', padding: '10px 0' }} alignCenter={ true }/>
                        <GreenContainer className="w-fit grid" style={{ gridTemplateColumns: '1fr 1fr', width: '1000px', padding: '30px 0' }}>
                            <>
                                <FlexColumnDivTemplate username={ username } setUsername={ setUsername } password={ password } setPassword={ setPassword } field="Login" onSubmit={ handleLogin } />
                                <FlexColumnDivTemplate username={ registerUsername } setUsername={ setRegisterUsername } password={ registerPassword } setPassword={ setRegisterPassword } field="Register" onSubmit={ handleRegistration } />
                            </>
                        </GreenContainer>
                    </>
                ) : (
                    <Loader color={ LoaderColor.green }/>
                ) }
            </div>
            <GreenContainer isBlue={ false } className="no-border-radius" style={{ height: '70px', position:"absolute", bottom: 0 }}>
                <></>
            </GreenContainer>
        </article>
    )
}

export default Login;