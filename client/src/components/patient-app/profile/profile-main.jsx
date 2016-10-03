import React, { Component } from 'react';
// Components
import ProfileForms from './profile-forms.jsx';

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