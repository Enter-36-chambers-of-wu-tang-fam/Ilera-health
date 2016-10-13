// Header shown for users successfully logged in or signed up
// React / Redux
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Actions
import { authenticateUser } from '../actions/actions.js';
// Material UI
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
    this.state = {
      burgerPlease: false
    }
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  handleClick() {
    this.setState({ burgerPlease: !this.state.burgerPlease })
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
        <h1><a href="/"><img src="/styles/logos/myilera_large.png" /></a></h1>
        <div
          className='mobileBurger'
          onClick={this.handleClick.bind(this)}>
          <i className="fa fa-bars fa-2x" aria-hidden="true"></i>
          </div>
          <ul
            className={this.state.burgerPlease ?
              'showBurger' : 'noBurger'}
              >
            <li>
              <FlatButton label="Home"
                backgroundColor={buttonStyles.backgroundColor}
                href={localStorage.getItem('userType') === 'patient' ?
                  "/patient/dashboard" : "/provider/dashboard"}
                hoverColor={buttonStyles.hoverColor}
                style={buttonStyles.styles}
                labelStyle={buttonStyles.labelStyle}
                rippleColor={buttonStyles.rippleColor}

              />
            </li>
            <li>
              <FlatButton label="Messages"
                backgroundColor={buttonStyles.backgroundColor}
                href={localStorage.getItem('userType') === 'patient' ?
                  "/patient/messages" : "/provider/messages"}
                hoverColor={buttonStyles.hoverColor}
                style={buttonStyles.styles}
                labelStyle={buttonStyles.labelStyle}
                rippleColor={buttonStyles.rippleColor}

              />
            </li>
            <li>
              <FlatButton label={localStorage
                  .getItem('userType') === 'patient' ?
                  "My Physicians" : "My Patients"}
                backgroundColor={buttonStyles.backgroundColor}
                hoverColor={buttonStyles.hoverColor}
                href={localStorage.getItem('userType') === 'patient' ?
                  "/patient/physicians" : "/provider/patients"}
                style={buttonStyles.styles}
                labelStyle={buttonStyles.labelStyle}
                rippleColor={buttonStyles.rippleColor}

              />
            </li>
            <li>
              <FlatButton label="Profile"
                backgroundColor={buttonStyles.backgroundColor}
                href={localStorage.getItem('userType') === 'patient' ?
                  "/patient/profile" : "/provider/profile"}
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
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ authenticateUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
