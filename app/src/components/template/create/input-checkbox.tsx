import React, { forwardRef } from "react";

interface InputCheckboxProps {
    id: string;
    onCheck: React.Dispatch<boolean> | Function;
    checked: boolean | undefined;
    disabled: boolean;
    title: string | undefined;
    name: string | undefined;
}

export const InputCheckbox = forwardRef((props: InputCheckboxProps, ref: React.ForwardedRef<HTMLInputElement> | null): JSX.Element => {

    const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onCheck instanceof Function) {
            props.onCheck(e.currentTarget.checked);
        }
    }

    return (
        <>
            <input
                type="checkbox"
                id={props.id}
                onChange={onCheck}
                checked={props.checked}
                disabled={props.disabled}
                ref={ref || undefined}
                name={props.name}
            />
            <label htmlFor={props.id} title={ props.title }></label>
        </>
    );
});
