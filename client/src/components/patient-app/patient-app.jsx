// React
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions.js';

class PatientApp extends Component {
  constructor(props) {
    super(props);
  }
  
  static contextTypes = {
      router: React.PropTypes.object
  }

  authenticated() {
    if (!this.props.authenticated) {
      this.context.router.push('/');
    }
  }
    render(){
        return (
            <div>
                { this.props.children }
            </div>
        ); 
    }
};

function mapStateToProps(state){
  return {authenticated: state.authenticated}
}

export default connect(mapStateToProps)(PatientApp);