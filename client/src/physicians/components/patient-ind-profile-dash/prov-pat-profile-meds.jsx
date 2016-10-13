import axios from 'axios';
import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import {Tabs, Tab} from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import AddMedForm from '../../containers/add-meds-form.jsx';

const buttonStyles = {
  hoverColor: "#eee",
  backgroundColor:'rgb(242, 108, 44)',
  labelStyle: {color:"#fff", fontWeight: 300},
  rippleColor: '#ccc',
  styles: { height: '50px', margin: '15px 25px', float: 'right'}
}

class ProfileMeds extends Component {

    constructor (props){
      super(props);
      this.state = {
        openMeds: false
      }
    }

    handleOpenMedsOpen() {
      this.setState({openMeds: true});
    };

    handleOpenMedsClose() {
      this.setState({openMeds: false});
    };

    handleDelete(med){
        axios.delete(`/api/patient/medications/${medid}`)
        .then( found => {
          // this.context.router.push('/patient/form/insurance/');
        })
        .catch( err => {
            console.log("ERROR ENTERING INFORMATION");
        })
    };

    render(){
        return (
            <div className="provPatMeds">
                <div>
                    <FlatButton label="Add Med"
                    backgroundColor={buttonStyles.backgroundColor}
                    hoverColor={buttonStyles.hoverColor}
                    style={buttonStyles.styles}
                    labelStyle={buttonStyles.labelStyle}
                    rippleColor={buttonStyles.rippleColor}
                    onTouchTap={this.handleOpenMedsOpen.bind(this)}
                    />
                </div>
                <div className="medsTableLabels">
                  <ul>
                    <li>Name</li>
                    <li>Dosage</li>
                    <li>Prescriber</li>
                    <li>Start Date</li>
                    <li>End Date</li>
                  </ul>
                  <div className="medsList">
                    {this.props.medications.map( med => {
                      return <div key={med.id * Math.random()}>
                               <ul>
                                <li>
                                   <a onClick={this.handleDelete.bind(this)}>
                                     <i className="material-icons">delete</i>
                                   </a>
                                   {med.drug_name}
                                 </li>
                                 <li>{med.dosage}</li>
                                 <li>{med.first} {med.last}</li>
                                 <li>{med.start_date.slice(0,10)}</li>
                                 <li>{med.end_date.slice(0,10)}</li>
                               </ul>
                            </div>
                    })}
                  </div>
                </div>
                <Dialog
                    modal={false}
                    open={this.state.openMeds}
                    onRequestClose={this.handleOpenMedsClose.bind(this)}
                >
                    <AddMedForm
                      patId={this.props.patId}
                    />
                </Dialog>
            </div>
        );
    }

};

export default ProfileMeds;
