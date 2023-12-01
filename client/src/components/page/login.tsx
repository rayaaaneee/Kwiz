import { forwardRef, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";



import { GreenContainer } from "../template/green-container";
import { InputText } from "../template/input-text";
import { Button } from "../template/button";
import { Title } from "../template/title";
import cookieContext from "../../context/cookie-context";

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

    const HandleUserIdCookie = useContext(cookieContext).get('user_id');

    const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        e.currentTarget.reset();

        fetch(`${ process.env.REACT_APP_API_URL }/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: registerUsername,
                password: registerPassword,
            }),
        }).then(res => res.json()).then(data => {
            if (data.success === true) {
                HandleUserIdCookie.set(data.id);
                navigate('/', { state: { from: location.pathname } });
            }
        });
    }

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch(`${ process.env.REACT_APP_API_URL }/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        }).then(res => res.json()).then(data => {
            if (data.success === true) {
                HandleUserIdCookie.set(data.id);
                navigate('/', { state: { from: location.pathname } });
            }
        });

        navigate('/', { state: { from: location.pathname } });
    }

    return (
        <article className="w-full h-full flex flex-column">
            <GreenContainer isBlue={ false } className="no-border-radius" style={{ height: '70px', position: "absolute", top: 0 }}>
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
            <GreenContainer isBlue={ false } className="no-border-radius" style={{ height: '70px', position:"absolute", bottom: 0 }}>
                <></>
            </GreenContainer>
        </article>
    )
}

export default Login;