import '../../css/template/button.css'

export const Button = (props: { id: string, onClick: () => void, text: string }): JSX.Element => 
{
    return (
        <button id={`${props.id}Button`} className="green-button" onClick={props.onClick}>
            {props.text}
        </button>
    );
}