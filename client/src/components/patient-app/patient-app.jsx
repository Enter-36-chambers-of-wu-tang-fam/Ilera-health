// React
import React, { Component, PropTypes } from 'react';

// Components
import Signin from '../auth/signin-component.js';

export default class PatientApp extends Component {
    render(){
        return (
            <div>
                { this.props.children }
            </div>
        ); 
    }
};