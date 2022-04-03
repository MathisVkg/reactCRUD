import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from './component/table';
import SuccessModal from './component/successModal';
import PopupModal from './component/formModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "reactstrap";

function App() {
  const [modal, setModal] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [dataOrder, setDataOrder] = useState([]);
  const [dataProvider, setDataProvider] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [errorForm, setErrorForm] = useState(false);
  let formData = {};
  let checkBox = [];
  const toggle = () => setModal(!modal);
  const toggleSuccess = () => setModalSuccess(!modalSuccess);

  const urlOrders = "https://localhost:7168/OrderDatabase";
  const urlProviders = "https://localhost:7168/ProviderDatabase";
  const urlCategory = "https://localhost:7168/CategoryDatabase";

  useEffect(async () => {
    await getOrders();
    await getProviders();
    await getCategories();
  }, [])

  async function getOrders() {
    await axios.get(urlOrders).then((resp) => {
      setDataOrder(resp.data);
      console.log(resp.data);
    })
  }
  async function getProviders() {
    await axios.get(urlProviders).then((resp) => {
      setDataProvider(resp.data);
    })
  }
  async function getCategories() {
    await axios.get(urlCategory).then((resp) => {
      setDataCategory(resp.data);
    })
  }

  const formSubmit = (e) => {
    e.preventDefault();
    checkForm(e);
    if (!checkForm(e)) return
    else {
      setModalState();
      postOrder();
    }
  }

  const checkForm = (e) => {
    formData = {
      name: e.target.name.value.trim(),
      price: e.target.price.value,
      providerId: e.target.provider.value,
      categoryId: e.target.category.value
    };
    if (formData.name === "" || formData.price <= 0) {
      setErrorForm(true);
      return false
    } else {
      formData.price = Number(formData.price);
      formData.providerId = Number(formData.providerId);
      formData.categoryId = Number(formData.categoryId);
      return true
    }
  }

  function setModalState() {
    setErrorForm(false);
    setModal(!modal);
    setTimeout(() => { setModalSuccess(!modalSuccess); }, 150);
  }

  async function postOrder() {
    await axios.post(urlOrders, formData).then(resp => {
      if (resp.status === 201) {
        getOrders();
      }
    })
  }

  async function deleteOrder() {
    const url = "https://localhost:7168/OrderDatabase?id=";
    checkBox.map(elem => {
      axios.delete(url + elem.id).then(resp => {
        getOrders();
      })
    });
    checkBox = [];
  }

  function pushCheckedBox(e) {
    const orderId = Number(e.target.id);
    const state = e.target.checked;
    if (state) {
      checkBox.push({
        "state": state,
        "id": orderId
      });
    } else checkBox = checkBox.filter(filter => filter.id !== orderId)
  }

  return (
    <div className="App d-flex flex-column justify-content-center">
      <div className="d-flex justify-content-between align-items-center containerTop">
        <h2 className="title">Gestion de plats</h2>
        <div className="d-flex ">
          <button type="button" className="btn btn-danger btnDelete" onClick={ deleteOrder }>Supprimer</button>
          <Button className="colorBtn" onClick={ toggle }>Ajouter +</Button>
          <PopupModal
              modal= {modal}
              toggle = {toggle}
              formSubmit= {formSubmit}
              dataProvider = {dataProvider}
              dataCategory = {dataCategory}
              errorForm = {errorForm}
          />
          <SuccessModal
              modalSuccess= {modalSuccess}
              toggleSuccess = {toggleSuccess}
          />
        </div>
      </div>
        <Table
            dataOrder = {dataOrder}
            dataProvider = {dataProvider}
            dataCategory = {dataCategory}
            pushCheckedBox = {pushCheckedBox}
        />
    </div>
  )
}


export default App;
