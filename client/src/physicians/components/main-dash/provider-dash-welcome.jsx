// Provider dashboard view with user's name and photo
// React
import React from 'react';

const DashboardWelcome = () => {
  return (
    <div className="">
      <h3>{`Welcome, ${localStorage.getItem('first')}!`}</h3>
      <img className="img" src="http://www.aspirehire.co.uk/aspirehire-co-uk/_img/profile.svg" />
    </div>
  );
};

export default DashboardWelcome;