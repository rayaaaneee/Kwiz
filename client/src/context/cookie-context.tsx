import { createContext, useContext, useMemo } from "react";

import { CookieContextManager } from "../object/cookie-context-manager";

import { CookieInterface } from "../interface/cookie-interface";
import { ChildrenInterface } from "../interface/children-interface";

import useCookie from "../hook/use-cookie";

const CookieContextManagerObj = new CookieContextManager();
const cookieContext = createContext<CookieContextManager>(CookieContextManagerObj);

export const CookieContextProvider = (props: ChildrenInterface): JSX.Element => {

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

    return (
        <cookieContext.Provider value={cookieContextValue}>
            {props.children}
        </cookieContext.Provider>
    )
}

export default cookieContext;