import { ToastInterface } from "../components/toast";

export class ToastContextManager {
    toasts: Array<ToastInterface>;
    getter: Array<ToastInterface>;
    setter: React.Dispatch<React.SetStateAction<Array<ToastInterface>>> | (() => void);

    constructor() {
        this.toasts = [];
        this.getter = [];
        this.setter = () => {};
    }

    initState(toastState: [Array<ToastInterface>, React.Dispatch<React.SetStateAction<Array<ToastInterface>>>]): void {
        this.getter = toastState[0];
        this.setter = toastState[1];
    }

    push(toast: ToastInterface): void {
        this.toasts = [...this.toasts, toast];
        this.setter([...this.toasts]);
    }

    get(): Array<ToastInterface> {
        return this.toasts;
    }

    delete(index: number): void {
        this.toasts.splice(index, 1);
        this.setter([...this.toasts]);
    }

    set(toasts: Array<ToastInterface>): void {
        this.toasts = toasts;
        this.setter([...this.toasts]);
    }

    clear(): void {
        this.setter([...this.toasts]);
    }
}