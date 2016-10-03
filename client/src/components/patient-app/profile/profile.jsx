import React, { Component } from 'react';
// Components
import ProfileSum from './profile-summary.jsx';
import ProfileMain from './profile-main.jsx';

let height = $(window).innerHeight();

export default class Profile extends Component {

    constructor (props){
      super(props);
      this.state={
        height: height
      };
      console.log("height", this.state.height);
    }

    render() {
      return (
          <div className='profilePage'>
            <ProfileSum style={{
              height: height
            }}/>
            <ProfileMain />
          </div>
      );
    }
}