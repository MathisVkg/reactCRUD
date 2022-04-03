import React from "react";
import { Modal, ModalBody } from "reactstrap";
import { GrStatusGood } from "react-icons/gr";

function SuccessModal(props) {
    const modalSuccess = props.modalSuccess;
    const toggleSuccess = () => {
        props.toggleSuccess();
    };
    return(
        <div>
            <Modal centered fullscreen="md" size="" backdrop="static" isOpen={ modalSuccess } toggle={ toggleSuccess }>
                <ModalBody className="d-flex flex-column align-items-center">
                    <GrStatusGood className="iconSuccess"/>
                    <p className="modalTitleSuccess">Opération réussis !</p>
                    <p className="modalSuccessContent">Le plat a bien été sauvegarder</p>
                    <button className="buttonOk" onClick={ toggleSuccess }>Ok</button>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default SuccessModal;