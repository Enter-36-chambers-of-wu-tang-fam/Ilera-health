// React
import React, { Component, PropTypes } from 'react';

// Components

export default class InsuranceInfoForm extends Component {
    render(){
        return (
            <div>
                <h2>Insurance Info</h2>
                <form>
                    <label>Insurance Name</label>
                    <input type="text" placeholder="Name of Insurance..." />
                    <label>Insurance Type</label>
                    <input type="text" placeholder="Insurance type..." />
                    <label>Policy Number</label>
                    <input type="number" placeholder="Phone number..." />
                </form>
            </div>
        );
    }   
};
