// React/Redux
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
  styles: { height: '50px', padding: '10px'}
};

class HeaderProvider extends Component {

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

  renderFlatButton (props) {
    return(
      <FlatButton 
        backgroundColor={buttonStyles.backgroundColor}
        hoverColor={buttonStyles.hoverColor}
        style={buttonStyles.styles}
        labelStyle={buttonStyles.labelStyle}
        rippleColor={buttonStyles.rippleColor}
        {...props}
      />
    )
  }

  render() {
    return (
      <header>
        <h1><a href="/"><img src="../styles/logos/myilera_large_white.png" /></a></h1>
        <ul>
          <li>
            <FlatButton label="Home" href={`/${localStorage.getItem('userType')}/dashboard`} component={this.renderFlatButton}/>
          </li>
          <li>
            <FlatButton label="Messages" href="/patient/messages" component={this.renderFlatButton} />
          </li>
          <li>
            <FlatButton label="My Physicians" href="/patient/physicians" component={this.renderFlatButton}/>
          </li>
          <li>
            <FlatButton label="Profile" href="/patient/profile" component={this.renderFlatButton}/>
          </li>
          <li>
            <FlatButton label="Log Out" onTouchTap={this.signOut.bind(this)} component={this.renderFlatButton}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderProvider);