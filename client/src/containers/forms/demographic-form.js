// React
import React, { Component, PropTypes } from 'react';

// Components

export default class DemographicForm extends Component {
    render(){
        return (
            <div>
                <h2>Basic User Info</h2>
                <form>
                    <label>First Name</label>
                    <input type="text" placeholder="First name..." />
                    <label>Last Name</label>
                    <input type="text" placeholder="Last name..." />
                    <label>Date of Birth</label>
                    <input type="date" placeholder="Date of birth..." />
                    <label>Address</label>
                    <input type="text" placeholder="Street address..." />
                    <label>City</label>
                    <input type="text" placeholder="City..." />
                    <label>State</label>
                    <select>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>
                    <label>Zip</label>
                    <input type="number" placeholder="Zip code..." />
                    <label>Email</label>
                    <input type="email" placeholder="Email..." />
                    <label>Phone Number</label>
                    <input type="number" placeholder="Phone number..." />
                    <label>Weight</label>
                    <input type="number" placeholder="Weight..." />
                    <label>Height</label>
                    <input type="height" placeholder="Height..." />
                    <label>Blood Type</label>
                    <input type="text" placeholder="Zip code..." />
                    <select>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                    
                </form>
            </div>
        );
    }   
};


// NOTE: for optimization, could make components be types of inputs to be mapped over. Would allow doctors to create forms, add questions to forms, etc.