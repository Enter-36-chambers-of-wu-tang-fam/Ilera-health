import React, { Component } from 'react';
// Components
import ProfileSum from './profile-summary.jsx';
import ProfileMain from './profile-main.jsx';

let height = $(window).innerHeight();

export default class Profile extends Component {

    constructor (props){
      super(props);
      this.state={
        windowHeight: ''
      };
    }

    componentWillMount(){
      this.setState({windowHeight: window.innerHeight - 50 });
    }

    render() {
      const { windowHeight } = this.state;

      return (
          <div className='profilePage'>
            <ProfileSum height={windowHeight}/>
            <ProfileMain />
          </div>
      );
    }
}