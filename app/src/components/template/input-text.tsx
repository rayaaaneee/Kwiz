import { ChangeEvent, forwardRef, useEffect, useRef, useState } from 'react';
import '../../css/template/input-text.scss';

interface InputTextInterface {
    name: string | undefined,
    id: string,
    placeholder: string,
    value: string
    pattern: RegExp | undefined
}

export const InputText = forwardRef((props: InputTextInterface, ref: React.ForwardedRef<HTMLInputElement> | null): JSX.Element =>
{
    const [value, setValue] = useState<string>(props.value);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const initValue = () => (setValue(''));

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
        <input name={ props.name } id={`${props.id}`} className="input-text" placeholder={props.placeholder} pattern={ props.pattern?.toString().split('/')[1] } type="text" value={value} onChange={handleChange} required ref={ inputRef }/>
    );
});