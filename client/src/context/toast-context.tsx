/* import { ComponentProps, Context, PropsWithChildren, createContext, useCallback, useContext, useRef, useState } from "react";
import Toast from "../components/toast";

interface ToastValueInterface {
/*     toasts: Array<any>,
    setToasts: Function 
}

type Params = ComponentProps<typeof Toast>;


const defaultPush = (toast: Params) => {}

const defaultValue: ToastValueInterface = {
    pushToastRef: {
        current: defaultPush
    }
}

const ToastContext: Context<ToastValueInterface> = createContext<ToastValueInterface>(defaultValue);

export const ToastContextProvider = ({ children }: PropsWithChildren) => {
    const pushToastRef = useRef(defaultPush);
    const [toasts, setToasts] = useState<Array<any>>([]);
    return (
        <ToastContext.Provider value={ pushToastRef }>
            <Toasts/>
            { children }
        </ToastContext.Provider>
    );
}

export const useToasts = () => {
    const { setToasts } = useContext(ToastContext);
    return {
        pushToast: useCallback((toast: any) => {
            setToasts((toasts: any) => [...toasts, toast]);
        }, [setToasts])
    }
}

const Toasts = () => {
    const { toasts } = useContext(ToastContext);
    return (
        <div className="toast-container flex flex-column flex-center">
            { toasts.map((toast, index) => 
                (<Toast { ...toast } key={ index } />)
            ) }
        </div>
    );
} 

export default ToastContext;

 */

export default false;