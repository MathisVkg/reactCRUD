import React from 'react';

function Table(props) {
    const order = props.dataOrder;
    const category = props.dataCategory;
    const provider = props.dataProvider;

    function pushCheckedBox(e) {
        props.pushCheckedBox(e);
    }
    function editOrder(e) {
    }
    function getProvider(id) {
        provider.map(elem => {
            if (elem.id === id) {
                return <>{ elem.name }</>
            }
        })
    }
    function getCategory(id) {
        category.map(elem => {
            if (elem.id === id) {
                return <>{ elem.name }</>
            }
        })
    }

    return(
        <table className="table text-center">
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
                    <td>
                      {/*<button type="button" className="btn" id={ element.id } onClick={ e => deleteOrder(e) }>x</button>*/}
                      <input type="checkbox" id={ element.id } onClick={ (e) => pushCheckedBox(e) }/>
                    </td>
                    <td>{ element.name }</td>
                    <td>{ getProvider(element.providerId) }</td>
                    <td>{ getCategory(element.categoryId) }</td>
                    <td>{ element.price }</td>
                    <td><button className="btn btnEdit" id={ element.id } onClick={ (e) => console.log(e.target.id) }>editer</button></td>
                  </tr> )
              })}
          </tbody>
        </table>
    )
}

export default Table;