import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { medChosen } from '../../../actions/medication.js';
import Medication from './medication-class.jsx';
import MedicationDetail from './meds-details.jsx';

class MedicationList extends Component{
  constructor(props){
    super(props);
    console.log('hello from MedicationList',props);
  }
  handleClick(medSelect){
    this.props.Chosen(medSelect)
    console.log('click');
  }

  render(){
    return (
      <ul>
        {this.props.meds.map(medication=>{
          return (
            <li
              key={medication.id}
              onClick={ this.handleClick.bind(this, medication) }
            >

              {medication.drug_name}
            </li>
          )
        })}
        
      </ul>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    Chosen: medSelect => dispatch(medChosen(medSelect))
  }
}

export default connect(state => ({
  meds: state.meds.medication,
  chosenMed: state.meds.chosenMed
}), mapDispatchToProps)(MedicationList)

// id
// drug_name
// dosage
// id_medication
// id_physician
// id_patient
// start_date
// end_date

//
// const MedicationList = ({handleClick, meds}) => {
//   const handleClick = selectedMed =>{
//
//   }
//   return (
//     <ul>
//       {meds.map(medication=>{
//         return ( <li key={medication.id}>
//           onClick={ handleClick(medication) }
//           {medication.drug_name}
//         </li> )
//       })}
//     </ul>
//   );
// }
//
// export default MedicationList;



// id
// drug_name
// dosage
// id_medication
// id_physician
// id_patient
// start_date
// end_date
