// React
import React, { Component } from 'react';
// Material UI
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {Tabs, Tab} from 'material-ui';
// Components
import SignUp from './signup-component.jsx';
import SignIn from './signin-component.jsx';

const buttonStyles = {
  hoverColor: "#eee",
  backgroundColor:null,
  labelStyle: {color:"#203248", fontWeight: 300},
  rippleColor: '#ccc',
  styles: { height: '50px', padding: '20px'}
};

const tabStyles = {
  styles: { backgroundColor: '#203248' }
};

export default class UnauthHeader extends Component {

  constructor (props){
    super(props);
    this.state = {
      openSignup: false,
      openSignin: false,
      userType: '',
      burgerPlease: false
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
    this.setState({ userType: user });
  }

  handleClick() {
    this.setState({ burgerPlease: !this.state.burgerPlease })
  }

  renderFlatButton (props) {
    return(
      <FlatButton
        backgroundColor={buttonStyles.backgroundColor}
        hoverColor={buttonStyles.hoverColor}
        style={buttonStyles.styles}
        labelStyle={buttonStyles.labelStyle}
        rippleColor={buttonStyles.rippleColor}
        {...props} />
    )
  }

  render() {
    return (
      <header>
        <h1><a href="/"><img src="/styles/logos/myilera_large.png" /></a></h1>
        <div
          className='mobileBurger'
          onClick={this.handleClick.bind(this)}
        >
          <i className="fa fa-bars fa-2x" aria-hidden="true"></i>
        </div>
        <ul
          className={this.state.burgerPlease ? 'showBurger' : 'noBurger'}
          >
          <li>
            <FlatButton
              label="For Patients"
              href={'#forpatients'}
              component={this.renderFlatButton}
            />
          </li>
          <li>
            <FlatButton
              label="For Providers"
              href={'#forproviders'}
              component={this.renderFlatButton}
            />
          </li>
          <li>
            <FlatButton
              label="For Staff"
              component={this.renderFlatButton}
            />
          </li>
          <li>
            <FlatButton
              label="About"
              href={'#team'}
              component={this.renderFlatButton}
            />
          </li>
          <li>
            <FlatButton
              label="Sign up"
              component={this.renderFlatButton}
              onTouchTap={this.handleSignupOpen.bind(this)}
            />
          </li>
          <li>
            <FlatButton
              label="Sign in"
              component={this.renderFlatButton}
              onTouchTap={this.handleSigninOpen.bind(this)}
            />
          </li>
        </ul>
        <Dialog
          modal={false}
          open={this.state.openSignup}
          onRequestClose={this.handleSignupClose.bind(this)}
          autoScrollBodyContent={true}
          className="homeModal" >
          <Tabs>
            <Tab
              label="Patient"
              style={tabStyles.styles}
              onActive={this.handleActive.bind(this)}
            >
              <SignUp
                userType={'patient'}
                title={'Patient'}
              />
            </Tab>
            <Tab
              label="Physician"
              style={tabStyles.styles}
              onActive={this.handleActive.bind(this)}
            >
              <SignUp
                userType={'physician'}
                title={'Physician'}
              />
            </Tab>
            <Tab
              label="Staff"
              style={tabStyles.styles}
              onActive={this.handleActive.bind(this)}
              >
              <SignUp
                userType={'staff'}
                title={'Staff'}
              />
            </Tab>
          </Tabs>
        </Dialog>
        <Dialog
          modal={false}
          open={this.state.openSignin}
          onRequestClose={this.handleSigninClose.bind(this)}
          autoScrollBodyContent={true}
          className="homeModal" >
          <Tabs>
            <Tab
              label="Patient"
              style={tabStyles.styles}
              onActive={this.handleActive.bind(this)}
            >
              <SignIn
                userType={'patient'}
                title={'Patient'}
              />
            </Tab>
            <Tab
              label="Physician"
              style={tabStyles.styles}
              onActive={this.handleActive.bind(this)}
            >
              <SignIn
                userType={'physician'}
                title={'Physician'}
              />
            </Tab>
            <Tab
              label="Staff"
              style={tabStyles.styles}
              onActive={this.handleActive.bind(this)}
            >
              <SignIn
                userType={'staff'}
                title={'Staff'}
              />
            </Tab>
          </Tabs>
        </Dialog>
      </header>
    );
  }
};
