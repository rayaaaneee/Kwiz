export const MainContainerPage = (props: { children: JSX.Element }): JSX.Element => {
    return (
        <div className="main-container-page flex-column flex-center">
            {props.children}
        </div>
    );
};