// Patient's view of medications prescribed
// React / Redux
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Actions
import { medChosen } from '../../actions/medication.js';

class MedicationList extends Component{
  constructor(props){
    super(props);
    this.state = {
      windowHeight: ''
    }
  }

  componentWillMount(){
    this.setState({ windowHeight: window.innerHeight })
  }

  handleClick(medSelect){
    this.props.Chosen(medSelect)
  }

  render(){
    const { meds } = this.props;
    const { windowHeight } = this.state;

    if( meds.length > 0 ){
      return (
        <div style={ {minHeight: windowHeight} }> 
          <h3>Med Name</h3>
          <ul>
            {meds.map( medication =>{
              return (
                <li
                  key={medication.id*Math.random()}
                  onClick={ this.handleClick.bind(this, medication) }
                >
                <p className="medTitle">{medication.drug_name}</p>
                </li>
              )
            })}
          </ul>
        </div>
      );
    }else{
      return (
        <div style={ {minHeight: windowHeight} }>
          <h3>No medications listed</h3>
        </div>
      );
    }
  }
};

const mapDispatchToProps = dispatch => {
  return {
    Chosen: medSelect => dispatch(medChosen(medSelect))
  }
};

export default connect(state => ({
  meds: state.meds.medication,
  chosenMed: state.meds.chosenMed
}), mapDispatchToProps)(MedicationList);