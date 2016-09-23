// React
import React, { Component } from 'react';

export default class Signup extends Component {
    rebder(){
        return (
            <form>
                <label>First</label>
                <input type="text" placeholder="Type first name here..." />
                <label>Last</label>
                <input type="text" placeholder="Type last name here..." />
                <label>Username</label>
                <input type="email" placeholder="Type username here..." />
                <label>Password</label>
                <input type="password" placeholder="Type password here..." />
                <label>Confirm Password</label>
                <input type="password" placeholder="Please re-type password..." />
            </form>
        );
    }
};