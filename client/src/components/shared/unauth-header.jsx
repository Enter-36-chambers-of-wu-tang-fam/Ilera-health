import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {Tabs, Tab} from 'material-ui';
import SignUp from '../auth/signup-component.js';
import SignIn from '../auth/signin-component.js';

const buttonStyles = {
  hoverColor: "#007874",
  backgroundColor:null,
  labelStyle: {color:"#999"},
  rippleColor: '#333',
  styles: { height: '50px',borderRadius: '0 !important'}
}

export default class UnauthHeader extends Component {

    constructor (props){
      super(props);
      this.state = {
        openSignup: false,
        openSignin: false,
        userType: ''
      }
    }
    handleSignupOpen() {
      this.setState({openSignup: true});
    };

    handleSignupClose() {
      this.setState({openSignup: false});
    };

    handleSigninOpen() {
      this.setState({openSignin: true});
    };

    handleSigninClose() {
      this.setState({openSignin: false});
    };

    handleActive(tab){
      if(tab.props['label'] === 'Provider'){
        var user = 'provider';
      }else{
        var user = 'patient';
      }
      console.log("USER", user);
      this.setState({ userType: user });
    }

    render() {

      return (
          <header>
            <h1><a href="/"><img src="../styles/logos/myilera_large_white.png" /></a></h1>
            <ul>
              <li>
                <FlatButton label="About" 
                  backgroundColor={buttonStyles.backgroundColor}
                  hoverColor={buttonStyles.hoverColor} 
                  style={buttonStyles.styles}
                  labelStyle={buttonStyles.labelStyle}
                  rippleColor={buttonStyles.rippleColor}

                />
              </li>
              <li>
                <FlatButton label="Sign up" 
                  backgroundColor={buttonStyles.backgroundColor}
                  hoverColor={buttonStyles.hoverColor} 
                  style={buttonStyles.styles}
                  labelStyle={buttonStyles.labelStyle}
                  rippleColor={buttonStyles.rippleColor}
                  onTouchTap={this.handleSignupOpen.bind(this)}
                />
              </li>
              <li>
                <FlatButton label="Sign in" 
                  backgroundColor={buttonStyles.backgroundColor}
                  hoverColor={buttonStyles.hoverColor} 
                  style={buttonStyles.styles}
                  labelStyle={buttonStyles.labelStyle}
                  rippleColor={buttonStyles.rippleColor}
                  onTouchTap={this.handleSigninOpen.bind(this)}
                />
              </li>
            </ul>
            <Dialog
              modal={false}
              open={this.state.openSignup}
              onRequestClose={this.handleSignupClose.bind(this)}
            >
              <Tabs>
                <Tab label="Patient" onActive={this.handleActive.bind(this)}>
                  <SignUp userType={'patient'} title={'Patient'}/>
                </Tab>
                <Tab label="Physician" onActive={this.handleActive.bind(this)}>
                  <SignUp userType={'physician'} title={'Physician'} />
                </Tab>
              </Tabs>
              
            </Dialog>
            <Dialog
              modal={false}
              open={this.state.openSignin}
              onRequestClose={this.handleSigninClose.bind(this)}
            >
              <SignIn />
            </Dialog>
          </header>
      );
    }
}