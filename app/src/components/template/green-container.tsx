import '../../css/template/green-container.scss';

interface GreenContainerInterface {
    className: string, 
    children: JSX.Element
}

export const GreenContainer = (props: GreenContainerInterface): JSX.Element => {
    return (
        <div className={`green-container ${props.className}`}>
            {props.children}
        </div>
    );
}