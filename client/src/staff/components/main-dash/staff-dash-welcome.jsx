import React, { Component } from 'react';

const DashboardWelcome = () => {

    return (
        <div className="">
            <h3>
              {`Welcome, ${localStorage.getItem('first')}!`}
            </h3>
            <img
              src="http://www.aspirehire.co.uk/aspirehire-co-uk/_img/profile.svg"
              alt=""
            />

        </div>
    );

};

export default DashboardWelcome;
