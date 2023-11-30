import { useState, useCallback } from "react"
import Cookies from "js-cookie"

const useCookie = (name: string, defaultValue?: any) => {

    const [value, setValue] = useState<any>(() => {
        const cookie: any = Cookies.get(name);
        if (cookie !== undefined) return cookie;
        else if (defaultValue !== undefined) Cookies.set(name, defaultValue);
    });

    const setCookie = useCallback(
        (newValue: any, options?: object) => {
            Cookies.set(name, newValue, options);
            setValue(newValue);
        },
        [name]
    );

    const deleteCookie = useCallback(() => {
        Cookies.remove(name);
        setValue(undefined);
    }, [name]);

    return [value, setCookie, deleteCookie];
}

export default useCookie;