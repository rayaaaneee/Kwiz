import React, { forwardRef } from "react";

interface InputCheckboxProps {
    id?: string;
    onCheck?: React.ChangeEventHandler<HTMLInputElement>;
    onCheckDispatch?: React.Dispatch<boolean>;
    onClick?: React.MouseEventHandler<HTMLLabelElement>;
    checked?: boolean;
    disabled?: boolean;
    title?: string;
    name?: string;
}

export const InputCheckbox = forwardRef(({ id, onCheck, onCheckDispatch, onClick, checked, disabled = false, title, name }: InputCheckboxProps, ref?: React.ForwardedRef<HTMLInputElement>): JSX.Element => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onCheck !== undefined) {
            onCheck(e);
        } else if (onCheckDispatch !== undefined) {
            onCheckDispatch(e.currentTarget.checked);
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
            <label onClick={ onClick } htmlFor={id} title={ title }></label>
        </>
    );
});
