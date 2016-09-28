import React, { Component } from 'react';

export default class Profile extends Component {

    constructor (props){
      super(props)
    }

    render() {
      return (
          <div>
          Hello from Profile!
          {this.props.children}
          </div>
      );
    }
}