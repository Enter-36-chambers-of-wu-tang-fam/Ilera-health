import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { authenticateUser } from '../actions/actions.js';
import { bindActionCreators } from 'redux';
import FlatButton from 'material-ui/FlatButton';


const buttonStyles = {
  hoverColor: "#203248",
  backgroundColor:null,
  labelStyle: {color:"white", fontWeight: 300},
  rippleColor: '#333',
  styles: { height: '50px'}
}

const scrollButtonStyles = {
  labelStyle: {color: "#203248"} 
}

class Header extends Component {

  constructor (props){
    super(props);
    this.state = {
      scroll: false
    }
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  componentDidMount () {
        window.addEventListener('scroll', this.handleScroll.bind(this, event));
    }

    componentWillUnmount () {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll (event) {
        console.log("scroll")
        this.setState({scroll : true})
    }

  signOut() {
    let userType = localStorage.getItem('userType');
    localStorage.removeItem('uid');          
    localStorage.removeItem('userType');
    this.props.authenticateUser(userType, null, "logout"); //(User type, data , form of authentication)
  }   

    render() {
      return (
          <header className={this.state.scroll ? 'scroll' : 'noScroll'}>
              <h1><a href="/"><img src="../styles/logos/myilera_large_white.png" /></a></h1>
              <ul>
              <li>
                <FlatButton label="Home" 
                  backgroundColor={buttonStyles.backgroundColor}
                  hoverColor={buttonStyles.hoverColor} 
                  style={buttonStyles.styles}
                  labelStyle={this.state.scroll ? scrollButtonStyles.labelStyle : buttonStyles.labelStyle}
                  rippleColor={buttonStyles.rippleColor}

                />
              </li>
               <li>
                <FlatButton label="Messages" 
                  backgroundColor={buttonStyles.backgroundColor}
                  hoverColor={buttonStyles.hoverColor} 
                  style={buttonStyles.styles}
                  labelStyle={this.state.scroll ? scrollButtonStyles.labelStyle : buttonStyles.labelStyle}
                  rippleColor={buttonStyles.rippleColor}

                />
              </li>
               <li>
                <FlatButton label="My Physicians" 
                  backgroundColor={buttonStyles.backgroundColor}
                  hoverColor={buttonStyles.hoverColor} 
                  style={buttonStyles.styles}
                  labelStyle={this.state.scroll ? scrollButtonStyles.labelStyle : buttonStyles.labelStyle}
                  rippleColor={buttonStyles.rippleColor}

                />
              </li>
              <li>
                <FlatButton label="Profile" 
                  backgroundColor={buttonStyles.backgroundColor}
                  hoverColor={buttonStyles.hoverColor} 
                  style={buttonStyles.styles}
                  labelStyle={this.state.scroll ? scrollButtonStyles.labelStyle : buttonStyles.labelStyle}
                  rippleColor={buttonStyles.rippleColor}
                />
              </li>
              <li>
                <FlatButton label="Log Out" 
                  backgroundColor={buttonStyles.backgroundColor}
                  hoverColor={buttonStyles.hoverColor} 
                  style={buttonStyles.styles}
                  labelStyle={this.state.scroll ? scrollButtonStyles.labelStyle : buttonStyles.labelStyle}
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

