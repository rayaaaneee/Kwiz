interface LittleTextInputInterface {
    id: string, 
    placeholder: string
}

export const LittleTextInput = (props : LittleTextInputInterface): JSX.Element => {
    return (
        <input className="" type="text" id={props.id} placeholder={props.placeholder} />
    );
}