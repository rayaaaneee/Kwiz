import '../../css/template/button.scss'

export const Button = (props: { id: string, onClick: (() => void) | undefined, text: string }): JSX.Element => 
{
    return (
        <button type='submit' id={`${props.id}Button`} className="green-button" onClick={props.onClick}>
            {props.text}
        </button>
    );
}