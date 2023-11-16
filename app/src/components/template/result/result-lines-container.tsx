export const ResultLinesContainer = (props: {children: JSX.Element}): JSX.Element => {
    return (
        <div className="result-line-container-3th-more flex flex-row align-center justify-evenly">
            {props.children}
        </div>
    );
};