import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { authenticateUser } from '../actions/actions.js';
import { bindActionCreators } from 'redux';

class Header extends Component {

  constructor (props){
    super(props);
  }

  static contextTypes = {
    router: React.PropTypes.object
  };

  signOut() {
    let userType = localStorage.getItem('userType');
    localStorage.removeItem('uid');          
    localStorage.removeItem('userType');
    this.props.authenticateUser(userType, null, "logout"); //(User type, data , form of authentication)
  }   

    render() {
      return (
          <header>
              <h1><a href="/"><img src="../styles/logos/myilera_large_white.png" /></a></h1>
              <ul>
                <li><a href="#" onClick={this.signOut.bind(this)}>Sign Out</a></li>
              </ul>
          </header>
      );
    }
};
const mapStateToProps = (state) => {
  return {
    authentication: state.authentication.authenticated
    }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ authenticateUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

