// React
import React, { Component, PropTypes } from 'react';


export default class PhysicianApp extends Component {

    logOut() {
      localStorage.removeItem('uid');
      localStorage.removeItem('userType');
    }
    render(){
        return (
            <div>
                { this.props.children }
                <PhysicianList />
            </div>
        );
    }
};
