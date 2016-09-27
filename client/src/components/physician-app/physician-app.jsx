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
                <a href="#" onClick={this.logOut}>Click to be able to return to signIn page (find me in physician-app)</a>
                { this.props.children }
            </div>
        ); 
    }
};