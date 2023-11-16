import '../../css/template/green-container.scss';

export const GreenContainer = (props: { className: string, children: JSX.Element }): JSX.Element => {
    return (
        <div className={`green-container ${props.className}`}>
            {props.children}
        </div>
    );
}