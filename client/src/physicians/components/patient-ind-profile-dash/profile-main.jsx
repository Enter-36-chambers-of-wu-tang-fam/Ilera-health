import React, { Component } from 'react';
// Components
import PatientProfileTabs from './prov-pat-profile-forms.jsx';
import ProfileDash from './prov-pat-profile-board.jsx';

export default class ProfileMain extends Component {

    constructor (props){
      super(props)
    }


    render() {
      return (
          <div>
            <ProfileDash />
            <PatientProfileTabs />
          </div>
      );
    }
}