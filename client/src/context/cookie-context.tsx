import { createContext } from "react";
import { CookieContextManager } from "../object/cookie-context-manager";

const CookieContextManagerObj = new CookieContextManager();
const cookieContext = createContext<CookieContextManager>(CookieContextManagerObj);

export default cookieContext;