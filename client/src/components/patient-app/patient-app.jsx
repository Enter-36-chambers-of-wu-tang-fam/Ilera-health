// React
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions.js';

<<<<<<< e7b20a2081046ae40236190e4adb9a0c930f62cd
class PatientApp extends Component {
  constructor(props) {
    super(props);
  }
  
  static contextTypes = {
      router: React.PropTypes.object
  }
=======
// Components
import Signin from '../auth/signin-component.js';
import Header from '../shared/header.jsx';

>>>>>>> Added dashboard components

  authenticated() {
    if (!this.props.authenticated) {
      this.context.router.push('/');
    }
  }
    render(){
        return (
            <div>
                <Header />
                { this.props.children }
            </div>
        ); 
    }
};

function mapStateToProps(state){
  return {authenticated: state.authenticated}
}

export default connect(mapStateToProps)(PatientApp);