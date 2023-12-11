import { ChangeEvent, forwardRef, useEffect, useRef, useState } from 'react';
import '../../asset/css/template/input-text.scss';

interface InputTextInterface {
    value?: string
    setValue?: React.Dispatch<React.SetStateAction<string>>

    name?: string,
    id?: string,
    placeholder?: string
    pattern?: RegExp
    type?: string
    style?: React.CSSProperties
}

export const InputText = forwardRef((props: InputTextInterface, ref?: React.ForwardedRef<HTMLInputElement>): JSX.Element =>
{

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        props.setValue && props.setValue(event.target.value);
    };

    const initValue = () => (props.setValue && props.setValue(''));

    let inputRef: any;

    inputRef = useRef<HTMLInputElement>(null);
    if (ref !== null) {
        inputRef = ref;
    }

    useEffect(() => {
        inputRef?.current?.form?.addEventListener("reset" , initValue);
        return () => {
            inputRef?.current?.form?.removeEventListener("reset", initValue);
        }
    });

    return (
        <input style={ props.style } name={ props.name } id={ props.id !== undefined ? props.id : undefined } className="input-text" placeholder={props.placeholder} pattern={ props.pattern?.toString().split('/')[1] } type={ props.type !== undefined ? props.type : 'text' } value={props.value } onChange={handleInput} required ref={ inputRef }/>
    );
});