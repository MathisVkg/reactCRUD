import React from 'react';
import {AiFillEdit} from "react-icons/ai";


function Table(props) {
    const order = props.dataOrder;
    const category = props.dataCategory;
    const provider = props.dataProvider;
    function pushCheckedBox(e) {
        props.pushCheckedBox(e);
    }
    function openModalEdit(e) {
        props.openModalEdit(e);
    }
    function findProvider(id) {
        let name;
        provider.map(elem => { if (elem.id === id) name = elem.name; })
        return name
    }
    function findCategory(id) {
        let name;
        category.map(elem => { if (elem.id === id) name = elem.name; })
        return name
    }

    function convertPrice(price) {
        if (price.toString().slice(2) !== '') return price.toString().slice(2) < 10 ? `${price}0` : `${price}`;
        if (price.toString().slice(3) !== '') return price.toString().slice(3) < 10 ? `${price}0` : `${price}`;
        else return price;
    }


    return(
        <table className="table table-striped text-center">
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
              { order.map((element, index) => { return(
                  <tr key={ index }>
                    <td><input type="checkbox" id={ element.id } onClick={ (e) => pushCheckedBox(e) }/></td>
                    <td>{ element.name }</td>
                    <td>{ findProvider(element.providerId) }</td>
                    <td>{ findCategory(element.categoryId) }</td>
                    <td>{ convertPrice(element.price) }€</td>
                    <td><button className="btnEdit" id={ element.id } onClick={ (e) =>openModalEdit(e) }><AiFillEdit className="editIcon"/></button></td>
                  </tr>
              )})}
          </tbody>
        </table>
    )
}

export default Table;