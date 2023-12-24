import { useEffect, useRef } from "react";

import '../asset/scss/toast.scss';

export enum ToastType {
    success = "success",
    error = "error",
    info = "info",
    warning = "warning"
}

export interface ToastInterface {
    message: string;
    type: ToastType;
    time?: number;
}

const Toast = (props: ToastInterface) => {

    const toastRef = useRef<HTMLDivElement>(null);

    let crossClicked: boolean = false;
    const handleClick = () => {
        if (crossClicked) return;

        crossClicked = true;
        toastRef.current?.classList.add('hide');

        setTimeout(() => {
            toastRef.current?.remove();
        }, 500);
    }

    setTimeout(() => {
        handleClick();
    }, props.time || 3000);

    useEffect(() => {
        setTimeout(() => {
            toastRef.current?.classList.add("show");
        }, 1);
    }, []);

    return (
        <div ref={ toastRef } className={`toast flex flex-center ${ props.type }`}>
            <div onClick={handleClick} className="cross" title="Fermer"></div>
            <div className="icon-container flex flex-center">
                <div className="icon flex flex-center"></div>
            </div>
            <p>{ props.message }</p>
        </div>
    )
};

export default Toast;