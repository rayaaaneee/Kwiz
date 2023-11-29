import { forwardRef, useState } from "react";

import { GreenContainer } from "../template/green-container";
import { InputText } from "../template/input-text";
import { Button } from "../template/button";
import { Title } from "../template/title";

import useCookie from "../../hook/use-cookie";
import { useLocation, useNavigate } from "react-router-dom";

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

    const [userId, setUserId, deleteUserId] = useCookie('user_id');

    const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Register');
        setUserId(1);
        navigate('/', { state: { from: location.pathname } });
    }

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUserId(1);
        console.log('Login');
        navigate('/', { state: { from: location.pathname } });
    }

    return (
        <article className="w-full h-full flex flex-column">
            <GreenContainer isBlue={ true } className="no-border-radius" style={{ height: '70px' }}>
                <></>
            </GreenContainer>
            <div className="flex flex-column align-center justify-center h-full" style={{ rowGap: '40px' }}>
                <Title text="Start with Kwiz !" style={{ width: '1000px', padding: '10px 0' }} alignCenter={ true }/>
                <GreenContainer className="w-fit grid" style={{ gridTemplateColumns: '1fr 1fr', width: '1000px', padding: '30px 0' }}>
                    <>
                        <FlexColumnDivTemplate username={ username } setUsername={ setUsername } password={ password } setPassword={ setPassword } field="Login" onSubmit={ handleLogin } />
                        <FlexColumnDivTemplate username={ registerUsername } setUsername={ setRegisterUsername } password={ registerPassword } setPassword={ setRegisterPassword } field="Register" onSubmit={ handleRegistration } />
                    </>
                </GreenContainer>
            </div>
        </article>
    )
}

export default Login;