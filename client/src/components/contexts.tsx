import { useContext, useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { ChildrenInterface } from "../interface/children-interface";
import { CookieInterface } from "../interface/cookie-interface";

import { CookieContextManager } from "../object/cookie-context-manager";
import useCookie from "../hook/use-cookie";

import cookieContext from "../context/cookie-context";
import loadingContext from "../context/loading-context";

const Contexts = (props: ChildrenInterface): JSX.Element => {

    const [userId, setUserIdCookie, deleteUserIdCookie] = useCookie('user_id');

    const userIdContextValue: CookieInterface = useMemo(
        () => ({
            get: () => userId,
            set: setUserIdCookie,
            delete: deleteUserIdCookie
        }),
        [userId, setUserIdCookie, deleteUserIdCookie]
    );

    const cookieContextValue: CookieContextManager = useContext(cookieContext);
    cookieContextValue.push('user_id', userIdContextValue);

    const [loaded, setLoaded] = useState<boolean>(false);

    const loadingContextValue = useMemo(
        () => ({
            loaded: loaded,
            setLoaded: setLoaded
        }),
        [loaded]
    );

    return (
        <loadingContext.Provider value={loadingContextValue}>
            <cookieContext.Provider value={cookieContextValue}>
                {props.children}
            </cookieContext.Provider>
        </loadingContext.Provider>
    );
}

export default Contexts;