import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MyPopupForm from './component/popupForm';
import { BsPencilSquare } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

function App() {
  const [data, setData] = useState([]);
  let isChecked = [];
  const apiUrl = "https://localhost:7168/OrderDatabase"

  useEffect(async () => {
    await axios.get(apiUrl).then((resp) => {
      console.log(resp.data);
      setData(resp.data);
    })
  }, [])

  function ModalBody() {
    return(
     <div>
        <Button color="success" onClick={ function noRefCheck(){} }>Ajouter +</Button>
        <Modal centered fullscreen="md" size="" toggle={ function noRefCheck(){} }>
            <ModalHeader toggle={ function noRefCheck(){} }>Modal title</ModalHeader>
            <ModalBody>
                <MyPopupForm />
                <p>test</p>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={ function noRefCheck(){} }>Do Something</Button>
                {' '}
                <Button onClick={ function noRefCheck(){} }>Cancel</Button>
            </ModalFooter>
        </Modal>
    </div> 
    )
  }

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
          <ModalBody />
        </div>
      </div>
      <TableOrders />
    </div>
  )
}



export default App;
