// React
import React, { Component, PropTypes } from 'react';


export default class PhysicianApp extends Component {
    render(){
        return (
            <div>
                { this.props.children }
            </div>
        ); 
    }
};