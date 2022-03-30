import React, { Component } from 'react';
import { Input } from 'reactstrap';

class MyPopupForm extends Component {

    render() {
        return(
            <div>
                <Input />
                <h2>Ajouter un plat</h2>
                <button type="button" className="btn">cross</button>
                <form>
                    <label></label>
                    <input type="text" />
                </form>
            </div> 
        )}
}

export default MyPopupForm;
