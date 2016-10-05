const PatientMedication = require('../models/patient_medication-helpers.js');

module.exports = {

  postMedication: (req, res) => {
    PatientMedication.new_medication(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  getAllpatientMeds: (req, res) => {
    console.log(req.params);
    PatientMedication.getAll_patientMeds(req.params, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  getAllMedsAndPhysicians: (req, res) => {

    PatientMedication.getAll_patient_medicationAndPhysician_info(req.params, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  }



};
