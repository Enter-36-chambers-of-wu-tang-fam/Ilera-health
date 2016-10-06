import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { authenticateUser } from '../actions/actions.js';
import { bindActionCreators } from 'redux';
import FlatButton from 'material-ui/FlatButton';


const buttonStyles = {
  hoverColor: "#eee",
  backgroundColor:null,
  labelStyle: {color:"#203248", fontWeight: 300},
  rippleColor: '#ccc',
  styles: { height: '50px'}
}

class Header extends Component {

  constructor (props){
    super(props);
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

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
                <li>
                  <FlatButton label="Home" 
                    backgroundColor={buttonStyles.backgroundColor}
                    hoverColor={buttonStyles.hoverColor} 
                    style={buttonStyles.styles}
                    labelStyle={buttonStyles.labelStyle}
                    rippleColor={buttonStyles.rippleColor}

                  />
                </li>
                <li>
                  <FlatButton label="Messages" 
                    backgroundColor={buttonStyles.backgroundColor}
                    hoverColor={buttonStyles.hoverColor} 
                    style={buttonStyles.styles}
                    labelStyle={buttonStyles.labelStyle}
                    rippleColor={buttonStyles.rippleColor}

                  />
                </li>
                <li>
                  <FlatButton label="My Physicians" 
                    backgroundColor={buttonStyles.backgroundColor}
                    hoverColor={buttonStyles.hoverColor} 
                    style={buttonStyles.styles}
                    labelStyle={buttonStyles.labelStyle}
                    rippleColor={buttonStyles.rippleColor}

                  />
                </li>
                <li>
                  <FlatButton label="Profile" 
                    backgroundColor={buttonStyles.backgroundColor}
                    hoverColor={buttonStyles.hoverColor} 
                    style={buttonStyles.styles}
                    labelStyle={buttonStyles.labelStyle}
                    rippleColor={buttonStyles.rippleColor}
                  />
                </li>
                <li>
                  <FlatButton label="Log Out" 
                    backgroundColor={buttonStyles.backgroundColor}
                    hoverColor={buttonStyles.hoverColor} 
                    style={buttonStyles.styles}
                    labelStyle={buttonStyles.labelStyle}
                    rippleColor={buttonStyles.rippleColor}
                    onTouchTap={this.signOut.bind(this)}
                  />
                </li>
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

