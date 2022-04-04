import React from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Input } from 'reactstrap';

function PopupModal(props) {
    const modal = props.modal;
    const category = props.dataCategory;
    const provider = props.dataProvider;
    const errorFrom = props.errorForm
    const editBtn = props.editBtn;
    const toggle = () => {
        props.toggle();
    };
    const formSubmit = (e) => {
        props.formSubmit(e);
    }
    const editSubmit = (e) => {
        props.editSubmit(e);
    }

    return(
        <div>
            <Modal centered fullscreen="md" size="" backdrop="static" isOpen={ modal } toggle={ toggle }>
                <ModalHeader>
                    <p className="modalTitle">Ajouter un plat</p>
                    <button type="button" className="cross-modal btn" onClick={ toggle }>x</button>
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={editBtn ? editSubmit : formSubmit} className="d-flex flex-column">
                        <div className="input-group flex-column mt-2">
                            <span>Libellé du plat</span>
                            <input className="form-control w-100" type="text" name="name"/>
                            <span className="errorSpan">{errorFrom ? "Le champ est requis" : ""}</span>
                        </div>
                        <div className="input-group flex-column mt-3">
                            <span>Famille du plat</span>
                            <select className="form-select w-100" name="category">
                                { category.map((element, index) => {
                                    return( <option key={index} id={element.id} value={element.id} name={element.name}>{element.name}</option> )})}
                            </select>
                        </div>
                        <div className="input-group flex-column mt-3">
                            <span>Fournisseur</span>
                            <select className="form-select w-100" name="provider">
                                { provider.map((element, index) => {
                                    return( <option key={index} id={element.id} value={element.id} name={element.name}>{element.name}</option> )})}
                            </select>
                        </div>
                        <div className="input-group flex-column mt-3">
                            <span>Prix</span>
                            <Input className="form-control w-100" type="number" min="0" step="0.1" name="price"/>
                            <span className="errorSpan">{errorFrom ? "Le champ est requis" : ""}</span>
                        </div>
                        <button type="submit" className="btnSubmit">Ajouter</button>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="ligt" className="btn-sm btnCancel" onClick={ toggle }>Annuler</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default PopupModal;