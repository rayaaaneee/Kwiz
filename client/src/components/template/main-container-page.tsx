import { ChildrenInterface } from "../../interface/children-interface";

export const MainContainerPage = (props: ChildrenInterface): JSX.Element => {
    return (
        <div className="main-container-page flex-column flex-center">
            {props.children}
        </div>
    );
};