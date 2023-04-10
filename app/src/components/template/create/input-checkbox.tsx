export const InputCheckbox = (props : {id: string, value: string}): JSX.Element => {
    return (
        <>
            <input type="checkbox" id={props.id} value={props.value} />
            <label htmlFor={props.id}></label>
        </>
    );
}