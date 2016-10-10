import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {Tabs, Tab} from 'material-ui';
import SignUp from './signup-component.js';
import SignIn from './signin-component.js';

const buttonStyles = {
  hoverColor: "#eee",
  backgroundColor:null,
  labelStyle: {color:"#203248", fontWeight: 300},
  rippleColor: '#ccc',
  styles: { height: '50px'}
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
            <h1><a href="/"><img src="/styles/logos/myilera_large.png" /></a></h1>
            <ul>
              <li>
                <FlatButton label="For Patients"
                  backgroundColor={buttonStyles.backgroundColor}
                  hoverColor={buttonStyles.hoverColor}
                  style={buttonStyles.styles}
                  labelStyle={buttonStyles.labelStyle}
                  rippleColor={buttonStyles.rippleColor}

                />
              </li>
               <li>
                <FlatButton label="For Providers"
                  backgroundColor={buttonStyles.backgroundColor}
                  hoverColor={buttonStyles.hoverColor}
                  style={buttonStyles.styles}
                  labelStyle={buttonStyles.labelStyle}
                  rippleColor={buttonStyles.rippleColor}

                />
              </li>
              <li>
               <FlatButton label="For Staff"
                 backgroundColor={buttonStyles.backgroundColor}
                 hoverColor={buttonStyles.hoverColor}
                 style={buttonStyles.styles}
                 labelStyle={buttonStyles.labelStyle}
                 rippleColor={buttonStyles.rippleColor}

               />
             </li>
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
                <Tab label="Staff" onActive={this.handleActive.bind(this)}>
                  <SignUp userType={'staff'} title={'Staff'} />
                </Tab>
              </Tabs>

            </Dialog>
            <Dialog
              modal={false}
              open={this.state.openSignin}
              onRequestClose={this.handleSigninClose.bind(this)}
            >
              <Tabs>
                <Tab label="Patient" onActive={this.handleActive.bind(this)}>
                  <SignIn userType={'patient'} title={'Patient'}/>
                </Tab>
                <Tab label="Physician" onActive={this.handleActive.bind(this)}>
                  <SignIn userType={'physician'} title={'Physician'} />
                </Tab>
                <Tab label="Staff" onActive={this.handleActive.bind(this)}>
                  <SignIn userType={'staff'} title={'Staff'}/>
                </Tab>
              </Tabs>
            </Dialog>
          </header>
      );
    }
}
