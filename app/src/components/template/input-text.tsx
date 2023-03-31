import { ChangeEvent, useState } from 'react';
import '../../css/template/input-text.css'

export const InputText = (props: { id: string, placeholder: string, value: string }): JSX.Element =>
{
    const [value, setValue] = useState<string>(props.value);

    const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <input id={`${props.id}InputText`} className="input-text" placeholder={props.placeholder} type="text" value={value} onChange={changeValue}/>
    );
};