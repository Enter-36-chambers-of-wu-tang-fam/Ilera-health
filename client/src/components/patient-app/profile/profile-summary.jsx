import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  btn: {
    display: 'block',
    margin: '10px auto 15px',
    width: '200px'
  },
};

export default class ProfileSum extends Component {

    constructor (props){
      super(props)
    }

    render() {
      return (
          <div className="profileSummary">
            <img className="profilePic" src="http://kurld.com/images/wallpapers/profile-pictures/profile-pictures-15.jpg" alt=""/>
            <h3>{`${localStorage.getItem('first')} ${localStorage.getItem('last')}`}</h3>
            <ul>
              <li><i className="material-icons">email</i></li>
              <li><i className="material-icons">place</i></li>

            </ul>
            <RaisedButton label="Reset Credentials" labelColor="white" backgroundColor='rgba(242, 108, 44, 1)' style={styles.btn}/>

            <div className="quicklinks">
                <h4>Quick Links</h4>
                <RaisedButton label="Book Appointment" labelColor="white" backgroundColor='rgba(242, 108, 44, 1)' style={styles.btn} />
                <RaisedButton label="Add Health Log" labelColor="white" backgroundColor='rgba(242, 108, 44, 1)' style={styles.btn}/>
                <RaisedButton label="View Records" labelColor="white" backgroundColor='rgba(242, 108, 44, 1)' style={styles.btn}/>
            </div>
          </div>
      );
    }
}