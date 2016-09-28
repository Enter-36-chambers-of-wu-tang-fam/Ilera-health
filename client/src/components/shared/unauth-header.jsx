import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {Tabs, Tab} from 'material-ui';
import SignUp from '../auth/signup-component.js';
import SignIn from '../auth/signin-component.js';

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
            <h1>Logo</h1>
            <ul>
              <li>
                <FlatButton label="About" style={ { height: '50px' }}/>
              </li>
              <li>
                <FlatButton label="Sign Up" style={ { height: '50px' }} onTouchTap={this.handleSignupOpen.bind(this)}/>
              </li>
              <li>
                <FlatButton label="Sign In" style={ { height: '50px' }} onTouchTap={this.handleSigninOpen.bind(this)}/>
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