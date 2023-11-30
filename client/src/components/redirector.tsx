import { useContext, useEffect, useMemo } from "react";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";

import { ChildrenInterface } from "../interface/children-interface";

import cookieContext from "../context/cookie-context";

import { CookieInterface } from "../interface/cookie-interface";

const Redirector = (props: ChildrenInterface): JSX.Element => {

    const location = useLocation();
    const navigate: NavigateFunction = useNavigate();

    const HandleUserIdCookie: CookieInterface = useContext(cookieContext).get('user_id');

    const connected: boolean = useMemo(() => (HandleUserIdCookie.value !== undefined), [HandleUserIdCookie.value]);

    useEffect(() => {

        // Rediriger à la page de connection si non connecté
        if (!connected && location.pathname !== '/login') {
            navigate('/login', { state: { from: location.pathname } });

        // Rediriger à la page d'accueil si connecté
        } else if (connected && location.pathname === '/login') {
            navigate('/', { state: { from: location.pathname } });
        }

    }, [connected, location.pathname, navigate]);

    return (
        <>
            { props.children }
        </>
    )
}

export default Redirector;