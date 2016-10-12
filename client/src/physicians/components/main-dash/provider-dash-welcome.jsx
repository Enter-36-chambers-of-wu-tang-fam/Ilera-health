import React, { Component } from 'react';

const DashboardWelcome = () => {
  // const profilePicture = {
  //        backgroundImage: `url(${localStorage.getItem('photo') ?
  //        localStorage.getItem('photo')
  //        : '/styles/defaults/default_photo.png' })`,
  //        backgroundSize:'cover',
  //        width: "150px",
  //        height: "150px",
  //        borderRadius: "50%",
  //        display: "block",
  //        margin: "20px auto"
  //    };
  return (
      <div className="">
        <h3>{`Welcome, ${localStorage.getItem('first')}!`}</h3>

        <div
          className="img"

          src="http://www.aspirehire.co.uk/aspirehire-co-uk/_img/profile.svg"
          >
        </div>

      </div>
  );

};

export default DashboardWelcome;


// old photo
// style={profilePicture}

// <img
//   src={`${user.photo_path}`}
//   alt=""
//   />
