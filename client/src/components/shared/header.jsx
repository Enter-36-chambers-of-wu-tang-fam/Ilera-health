import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class Header extends Component {

  constructor (props){
    super(props)
  }
  logOut() {
    localStorage.removeItem('uid');          
    localStorage.removeItem('userType');
  }   

    render() {
      return (
          <header>
              <a href="#" onClick={this.logOut}>Click to be able to return to signIn page</a>
            Hello I'm the header!
          </header>
      );
    }
}