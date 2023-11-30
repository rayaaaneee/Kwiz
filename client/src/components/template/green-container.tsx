import '../../asset/css/template/green-container.scss';

import { ChildrenInterface } from '../../interface/children-interface';

interface GreenContainerInterface extends ChildrenInterface {
    className?: string,
    style?: React.CSSProperties, 
    isBlue?: boolean
}

export const GreenContainer = (props: GreenContainerInterface): JSX.Element => {
    return (
        <div className={`green-container 
            ${props.className !== undefined ? props.className : '' } 
            ${props.isBlue !== undefined && 
                (props.isBlue && 'blue') 
            }`} 
            style={ props.style }>
            {props.children}
        </div>
    );
}