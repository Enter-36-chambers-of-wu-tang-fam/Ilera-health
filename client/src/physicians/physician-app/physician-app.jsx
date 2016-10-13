// React
import React, { Component, PropTypes } from 'react';
import Header from '../../auth-shared/components/header.jsx';


export default class PhysicianApp extends Component {

    logOut() {
      localStorage.removeItem('uid');
      localStorage.removeItem('userType');
    }
    render(){
      return (
        <div>
          <Header />
          <main className="physicianAppMain">
            { this.props.children }
          </main>
        </div>
      );
    }
};
