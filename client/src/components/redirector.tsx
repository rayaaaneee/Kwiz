import useCookie from "../hook/use-cookie";
import { useEffect, useMemo } from "react";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";

interface RedirectorInterface {
    children: JSX.Element
}

const Redirector = (props: RedirectorInterface): JSX.Element => {

    const location = useLocation();
    const navigate: NavigateFunction = useNavigate();

    const [userId, setCookie, deleteCookie] = useCookie('user_id');

    const connected: boolean = useMemo(() => (userId !== undefined), [userId]);


    useEffect(() => {

        // Rediriger à la page de connection si non connecté
        if (!connected && location.pathname !== '/login') {
            navigate('/login', { state: { from: location.pathname } });

        // Rediriger à la page d'accueil si connecté
        } else if (connected && location.pathname === '/login') {
            navigate('/', { state: { from: location.pathname } });
        }

    }, [connected, location.pathname, navigate]);

    console.log(userId);

    return (
        <>
            { props.children }
        </>
    )
}

export default Redirector;