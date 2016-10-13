// Component holds the profile forms used by patient to update their info
// React
import React, { Component } from 'react';
// Components
import ProfileForms from '../../containers/profile-dash/profile-forms.jsx';

export default class ProfileMain extends Component {

  constructor (props){
    super(props)
  }

  render() {
    return (
      <div className="profileRight">
        <ProfileForms />
      </div>
    );
  }
}