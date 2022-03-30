import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

function App() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [data, setData] = useState([]);
  const apiUrl = "https://localhost:7168/OrderDatabase"

  useEffect(async () => {
    await axios.get(apiUrl).then((resp) => {
      console.log(resp.data);
      setData(resp.data);
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
            {
              data.map((element, index) => { return(
                <tr key={ index }>
                    <td><button className="btn" id={ element.id } onClick={ event => deleteOrder(event) }>x</button></td>
                    <td>{ element.dish }</td>
                    <td>{ element.provider }</td>
                    <td>{ element.familyDish }</td>
                    <td>{ element.price }</td>
                    <td><button className="btn"><BsPencilSquare /></button></td>
                </tr>
              )})
            }
        </tbody>
      </table>
    )
  }

  function PopupModal() {
    return(
      <div>                
          <Button color="success" onClick={ toggle }>Ajouter +</Button>
          <Modal centered fullscreen="md" size="" isOpen={ modal } toggle={toggle}>
              <ModalHeader>
                <h3>Ajouter un plat</h3>
                <button type="button" className="cross-modal btn" onClick={ toggle }>x</button>
              </ModalHeader>
              <ModalBody>
                <div>
                  <form className="d-flex flex-column">
                      <div className="input-group flex-column mt-2">
                        <span>Libellé du plat</span>
                        <input className="form-control w-100" type="text" name="name" value=""/>
                      </div>
                      <div className="input-group flex-column mt-3">
                        <span>Famille du plat</span>
                        <select class="form-select w-100" name="dishfamily">
                            <option value="1">Sandwich</option>
                            <option value="2">Dinner</option>
                            <option value="3">En-câs</option>
                        </select>
                      </div>
                      <div className="input-group flex-column mt-3">
                        <span>Fournisseur</span>
                        <select class="form-select w-100" name="provider" >
                            <option value="1">Carrefour</option>
                            <option value="2">Lustu</option>
                            <option value="3">Herta</option>
                        </select>
                      </div>
                      <div className="input-group flex-column mt-3">
                        <span>Prix</span>
                        <input class="form-control w-100" type="number" min="0"/>
                      </div>
                  </form>
                </div>
              </ModalBody>
              <ModalFooter>
                  <Button color="ligt" className="btn-sm" onClick={ toggle }>Annuler</Button>
                  <Button color="success" className="btn-sm">Ajouter</Button>
              </ModalFooter>
          </Modal>
      </div>  
    )
  }

  function deleteOrder(event) {
    console.log(event.target.id)
  }

  function DeleteButton() {
    return(
      <button type="button" className="btn btn-danger btnDelete">Supprimer</button>
    )
  }

  return (
    <div className="App d-flex flex-column justify-content-center">
      <div className="d-flex justify-content-between align-items-center containerTop">
        <h2 className="title">Gestion de plats</h2>
        <div className="d-flex ">
          <PopupModal />
        </div>
      </div>
      <TableOrders />
    </div>
  )
}



export default App;
