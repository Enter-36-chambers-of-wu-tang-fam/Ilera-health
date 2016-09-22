// React
import React, { Component, PropTypes } from 'react';

// Components
import Signin from '../auth/signin_component.js';

export default class PhysicianApp extends Component {
    render(){
        return (
            <div>
                PhysicianApp
                { this.props.children }
            </div>
        ); 
    }
};