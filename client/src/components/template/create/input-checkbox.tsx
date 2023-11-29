import React, { forwardRef } from "react";

interface InputCheckboxProps {
    id: string;
    onCheck: React.Dispatch<boolean> | Function;
    checked?: boolean;
    disabled?: boolean;
    title?: string;
    name?: string;
}

export const InputCheckbox = forwardRef(({ id, onCheck, checked = false, disabled = false, title, name }: InputCheckboxProps, ref?: React.ForwardedRef<HTMLInputElement>): JSX.Element => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onCheck instanceof Function) {
            onCheck(e.currentTarget.checked);
        }
    }

    return (
        <>
            <input
                type="checkbox"
                id={id}
                onChange={ handleChange }
                checked={checked}
                disabled={disabled}
                ref={ref || undefined}
                name={name}
            />
            <label htmlFor={id} title={ title }></label>
        </>
    );
});
