import { createPortal } from "react-dom";

import '../asset/css/toast.scss';

interface ToastInterface {
    text: string,
    key: number
}

const Toast = (props: ToastInterface) => {
    return createPortal((
        <div className="toast-container flex flex-center">
            <div className="toast-cross" title="Fermer"></div>
            <p>{ props.text }</p>
        </div>
    ), document.body);
}

export default Toast;