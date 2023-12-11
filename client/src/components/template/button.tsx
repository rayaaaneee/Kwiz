import '../../asset/css/template/button.scss';

export enum ButtonColor {
    green = 'green-button',
    red = 'red-button',
    blue = 'blue-button',
    yellow = 'yellow-button',
}

interface ButtonInterface {
    text: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,

    color?: ButtonColor,
    id?: string,
    className?: string,
    style?: React.CSSProperties,
}

export const Button = (props: ButtonInterface): JSX.Element => 
{
    return (
        <button style={ props.style } type='submit' id={ props.id !== undefined ? `${props.id}Button` : undefined } className={`${props.className} flex flex-center button ${props.color ? props.color : ButtonColor.blue }`} onClick={props.onClick}>
            {props.text}
        </button>
    );
}