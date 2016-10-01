import React, { Component } from 'react';
import axios from 'axios';
const GET_PHYS = 'http://localhost:3636/api/';
export default class AllUsers extends Component {
  getPhysicians(){
    axios.get(GET_PHYS).then(function(response){
      const emails = response.data.map(function(item){
        console.log(item.first);
        return (<p>{item.first}</p>);
      })
    })

  }
    // constructor (props){
    //   super(props)
    // }

    render() {
      return (
          <div>
          Hello from allUsers!
          {this.props.children}
          <p>{this.getPhysicians()}</p>

          </div>
      );
    }
}
