const patientMedication = require('../models/patient_medication-helpers.js');

module.exports = {

  getAllpatientMeds: (req, res) => {
    console.log(req.params);
    patientMedication.getAll_patientMeds(req.params, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  }

};
