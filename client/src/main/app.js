// React
import React, { Component, PropTypes } from 'react';

// Components

export default class App extends Component {
    render(){
        return (
            <div>
                { this.props.children }
            </div>
        );
    }   
};