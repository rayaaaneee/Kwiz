

import { ChildrenInterface } from "../interface/children-interface";

import { CookieContextProvider } from "../context/cookie-context";
import { ToastContextProvider } from "../context/toast-context";

const Contexts = (props: ChildrenInterface): JSX.Element => (
    <ToastContextProvider>
        <CookieContextProvider>
            {props.children}
        </CookieContextProvider>
    </ToastContextProvider>
)

export default Contexts;