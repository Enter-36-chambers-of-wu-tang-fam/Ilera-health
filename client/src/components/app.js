// React
import React, { Component, PropTypes } from 'react';

// Components
import Signin from './auth/signin-component.js';

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