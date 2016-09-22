// React
import React, { Component, PropTypes } from 'react';

// Components
import Signin from './auth/signin_component.js';
import PatientApp from './patient-app/patient-app.jsx';
import PhysicianApp from './physician-app/physician-app.jsx';

export default class App extends Component {
    render(){
        return (
            <div>
                Test test test
                { this.props.children }
            </div>
        ); 
    }
};