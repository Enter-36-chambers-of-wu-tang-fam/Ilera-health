import React, { Component, PropTypes } from 'react';

import HealthLogContainer from '../../containers/health-log/health-log-container.jsx';

export default class healthLog extends Component {
  constructor(props){
    super(props);

  }

  render(){
    return(
      <div>
        <HealthLogContainer/>
      </div>
    )
  }
}


























// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import healthLogs from '../../../main/reducers/health-log-reducer';

// export default class HealthLog extends Component {
//
//     constructor (props){
//       super(props)
//     }
//
//     render() {
//       return (
//           <div>
//           Hello from HealthLog!
//           </div>
//       );
//     }
// }
//
// const mapStateToProps = (state) => {
//   console.log(state.healthLogsReducer())
//   return {
//     healthLogs: state.healthLogsReducer()
//   }
// }
