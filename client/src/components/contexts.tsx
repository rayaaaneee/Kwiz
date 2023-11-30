import { useContext, useMemo } from "react";

import { ChildrenInterface } from "../interface/children-interface";
import { CookieInterface } from "../interface/cookie-interface";

import { CookieContextManager } from "../object/cookie-context-manager";
import useCookie from "../hook/use-cookie";

import cookieContext from "../context/cookie-context";

const Contexts = (props: ChildrenInterface): JSX.Element => {

    const [userId, setUserIdCookie, deleteUserIdCookie] = useCookie('user_id');

    const userIdContextValue: CookieInterface = useMemo(
        () => ({
            value: userId,
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
    );
}

export default Contexts;