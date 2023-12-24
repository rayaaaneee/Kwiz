import '../../asset/scss/template/container.scss';

import { ChildrenInterface } from '../../interface/children-interface';

export enum ContainerColor {
    green = 'green',
    blue = 'blue',
    red = 'red',
    yellow = 'yellow',
    white = 'white',
}

interface ContainerInterface extends ChildrenInterface {
    className?: string,
    color?: ContainerColor,
    style?: React.CSSProperties, 
}

export const Container = (props: ContainerInterface): JSX.Element => {
    return (
        <div className={`container 
            ${props.className !== undefined ? props.className : '' } 
            ${props.color !== undefined ? props.color : 'green' }`}
            style={ props.style }>
            {props.children}
        </div>
    );
}