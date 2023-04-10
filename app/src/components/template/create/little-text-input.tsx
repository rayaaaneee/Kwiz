export const LittleTextInput = (props : {id: string, placeholder: string}): JSX.Element => {
    return (
        <input className="" type="text" id={props.id} placeholder={props.placeholder} />
    );
}