import { createPortal } from "react-dom";
import { ChildrenInterface } from "../interface/children-interface";
import { Button, ButtonColor } from "./template/button";
import { Container, ContainerColor } from "./template/container";

interface ConfirmInterface extends ChildrenInterface {
    onConfirm?: React.MouseEventHandler<HTMLButtonElement>;
    onCancel?: React.MouseEventHandler<HTMLButtonElement>;

    message?: string;
}

const Confirm = (props: ConfirmInterface) => {
    return createPortal(
        <form className="w-full h-full flex flex-center" style={{ position: 'fixed', top: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: '1000' }}>
            <Container color={ ContainerColor.white } className="flex-column flex-center" style={{ width: '500px' }}>
                <>
                    { props.message && (
                        <h2 style={{ textAlign: 'center' }}>{ props.message }</h2>
                    ) }
                    { props.children }
                    <div className="flex flex-row" style={{ columnGap: '20px'}}>
                        <Button type="button" onClick={ props.onCancel } color={ ButtonColor.red } text="Cancel" />
                        <Button onClick={ props.onConfirm } color={ ButtonColor.green } text="Confirm" />
                    </div>
                </>
            </Container>
        </form>
    , document.body);
};

export default Confirm;