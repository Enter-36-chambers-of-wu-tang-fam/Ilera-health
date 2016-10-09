import React, { Component } from 'react';

const ProfileMeds = ({user, medications}) => {

    return (
        <div className="profileDash">
            <div className="provViewPatDash">
                <img src={`${user.photo_path}`} alt=""/>
                <h3>{medications[0]} {user.last}</h3>
            </div>
            <div className="provViewPatDash">
                <h3>Important</h3>
                <h6>Blood Type</h6>
                <h5>{user.blood_type ? user.blood_type : "No data"}</h5>
                <h6>Primary Phone</h6>
                <h5>{user.primary_phone_number ? user.primary_phone_number : "No data"}</h5>
                <h6>D.O.B.</h6>
                <h5>{user.date_of_birth ? user.date_of_birth : "No data"}</h5>
                <h6>Allergies</h6>
                <h5>{user.allergies ? user.allergies : "No data"}</h5>
            </div>
            <div className="provViewPatDash">
            </div>
        </div>
    );

};

export default ProfileMeds;