import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { fetchPhysicians } from '../actions/actions';



class PhysicianList extends Component {

  this.props.fetchPhysicians();

//   constructor(props){
//     super(props)
//     this.state = {physicians: []}
//   }
//   componentWillMount(){
//     this.props.fetchPhysicians();
//   }
// componentWillReceiveProps(nextProps){
//   this.setState({physicians: nextProps.physicians});
// }

  render(){
    return (
        <div>
          {console.log(this.props.physicians)}
        </div>
    );
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchPhysicians}, dispatch);

}

function mapStateToProps(state){
  return {
    physicians: state.physicians
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhysicianList);
