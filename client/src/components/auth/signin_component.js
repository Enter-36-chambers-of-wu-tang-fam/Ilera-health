// React
import React, { Component } from 'react';

const Signin = () => {
    return (
        <form>
            <label>Username</label>
            <input type="email" placeholder="Type username here..." />
            <label>Password</label>
            <input type="password" placeholder="Type password here..." />
            <label>Re-Type Password</label>
            <input type="password" placeholder="Please re-type password..." />
        </form>
    );
}

export default Signin; 