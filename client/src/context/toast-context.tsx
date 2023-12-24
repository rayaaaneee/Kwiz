import { createContext, useState } from "react";

import { ToastContextManager } from "../object/toast-context-manager";

import { ChildrenInterface } from "../interface/children-interface";

import Toast, { ToastInterface } from "../components/toast";

import '../asset/scss/toast.scss';

const ToastContextManagerObj = new ToastContextManager();
const toastContext = createContext<ToastContextManager>(ToastContextManagerObj);

export const ToastContextProvider = (props: ChildrenInterface): JSX.Element => {

    ToastContextManagerObj.initState(useState<ToastInterface[]>([]));

    return (
        <toastContext.Provider value={ToastContextManagerObj}>
            <div id="toasts-container" className="flex flex-column flex-center">
                {ToastContextManagerObj.getter.map((toast: ToastInterface, index: number) => (
                    <Toast key={index} {...toast} />
                ))}
            </div>
            {props.children}
        </toastContext.Provider>
    )
}

export default toastContext;