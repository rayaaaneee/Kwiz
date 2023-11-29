import '../../asset/css/template/button.scss';

interface ButtonInterface {
    text: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,

    id?: string,
}

export const Button = (props: ButtonInterface): JSX.Element => 
{
    return (
        <button type='submit' id={ props.id !== undefined ? `${props.id}Button` : undefined } className="green-button" onClick={props.onClick}>
            {props.text}
        </button>
    );
}