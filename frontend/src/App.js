import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { GrStatusGood } from 'react-icons/gr'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Input } from 'reactstrap';

function App() {
  const [modal, setModal] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [dataOrder, setDataOrder] = useState([]);
  const [dataProvider, setDataProvider] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [errorFromName, setErrorFormName] = useState(false);
  const [errorFromPrice, setErrorFormPrice] = useState(false);
  let formData = {};
  let isChecked = [];
  const toggle = () => setModal(!modal);
  const toggleSuccess = () => setModalSuccess(!modalSuccess);

  const urlOrders = "https://localhost:7168/OrderDatabase";
  const urlProviders = "https://localhost:7168/ProviderDatabase";
  const urlCategory = "https://localhost:7168/CategoryDatabase";

  useEffect(async () => {
    await axios.get(urlOrders).then((resp) => {
      setDataOrder(resp.data);
      console.log(resp.data);
    }, (err) => {
      console.log(err)
    })
    await axios.get(urlProviders).then((resp) => {
      setDataProvider(resp.data);
    }, (err) => {
      console.log(err)
    })
    await axios.get(urlCategory).then((resp) => {
      setDataCategory(resp.data);
    }, (err) => {
      console.log(err)
    })
  }, [])

  function TableOrders() {
    return(
      <table className="table table-hover table-responsive text-center">
        <thead className="table-dark table-align-middle">
          <tr>
              <th></th>
              <th>Nom</th>
              <th>Fournisseurs</th>
              <th>Catégorie</th>
              <th>Prix</th>
              <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            { dataOrder.map((element, index) => { return(
              <tr key={ index }>
                  <td>
                    {/* <button type="button" className="btn" id={ element.id } onClick={ e => deleteOrder(e) }>x</button> */}
                    <input type="checkbox" id={ element.id } onClick={ (e) => setCheckBox(e) }/>
                  </td>
                  <td>{ element.dish }</td>
                  <td>{ element.provider }</td>
                  <td>{ element.category }</td>
                  <td>{ element.price }</td>
                  <td><button className="btn btnEdit" id={ element.id } onClick={ (e) => editOrder(e) }>editer</button></td>
              </tr> )})}
        </tbody>
      </table>
    )
  }

  function PopupModal() {
    return(
      <div>                
          <Button className="colorBtn" onClick={ toggle }>Ajouter +</Button>
          <Modal centered fullscreen="md" size="" backdrop="static" isOpen={ modal } toggle={ toggle }>
              <ModalHeader>
                <p className="modalTitle">Ajouter un plat</p>
                <button type="button" className="cross-modal btn" onClick={ toggle }>x</button>
              </ModalHeader>
              <ModalBody>
                <form onSubmit={formSubmit} className="d-flex flex-column">
                  <div className="input-group flex-column mt-2">
                    <span>Libellé du plat</span>
                    <input className="form-control w-100" type="text" name="dish"/>
                    <span className="errorSpan">{errorFromName ? "Le champ est requis" : ""}</span>
                  </div>
                  <div className="input-group flex-column mt-3">
                    <span>Famille du plat</span>
                    <select className="form-select w-100" name="category">
                      { dataCategory.map((element, index) => {
                          return( <option key={index} id={element.id} value={element.name} name={element.name}>{element.name}</option> )})}
                    </select>
                  </div>
                  <div className="input-group flex-column mt-3">
                    <span>Fournisseur</span>
                    <select className="form-select w-100" name="provider">
                    { dataProvider.map((element, index) => {
                          return( <option key={index} id={element.id} value={element.name} name={element.name}>{element.name}</option> )})}
                    </select>
                  </div>
                  <div className="input-group flex-column mt-3">
                    <span>Prix</span>
                    <Input className="form-control w-100" type="number" min="0" step="0.1" name="price"/>
                    <span className="errorSpan">{errorFromPrice ? "Le champ est requis" : ""}</span>
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

  function SuccessModal() {
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

  function setCheckBox(e) {
    const orderId = Number(e.target.id);
    isChecked.push(orderId);
  }

  function deleteOrder(e) {
    let newArray = [];
    dataOrder.map(elem => {
      isChecked.map(value => {
        if (value === elem.id) newArray.push(elem);
      })
    })
    console.log(newArray)
    // const orderId = Number(e.target.id);
    // const newArray = dataOrder.filter(elem => elem.id !== orderId);
    // setDataOrder(newArray);
  }

  function editOrder(e) {
    console.log(e.target.id);
  }

  const formSubmit = (e) => {
    e.preventDefault();
    formData = {
      id: 0,
      dish: e.target.dish.value.trim(),
      category: e.target.category.value,
      provider: e.target.provider.value,
      price: e.target.price.value
    };
    genereId();
    if (formData.dish === "") {
      setErrorFormName(true);
    } if (formData.price <= 0) {
      setErrorFormPrice(true);
    } else {
      setErrorFormName(false);
      setErrorFormPrice(false);
      setModal(!modal);
      setTimeout(() => { setModalSuccess(!modalSuccess); }, 150);
      formData.price = Number(formData.price);
      console.log(formData)
      dataOrder.push(formData);
    }
  }

  function genereId() {
    const id = Math.floor(Math.random(1) * 100);
    dataOrder.map(elem => {
      if (elem.id !== id) {
        formData.id = id;
      } else genereId();
    })
  }

  return (
    <div className="App d-flex flex-column justify-content-center">
      <div className="d-flex justify-content-between align-items-center containerTop">
        <h2 className="title">Gestion de plats</h2>
        <div className="d-flex ">
          <button type="button" className="btn btn-danger btnDelete" onClick={ e => deleteOrder(e) }>Supprimer</button>
          <PopupModal />
          <SuccessModal />
        </div>
      </div>
      <TableOrders />
    </div>
  )

}


export default App;
