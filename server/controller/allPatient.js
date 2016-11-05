'use strict'

const Patient = require("../models/patient-helpers.js");
const Appointment = require("../models/appointment-helpers.js");
const Healthlog = require("../models/health_log-helpers.js");
const Insurance = require("../models/insurance_plan-helpers.js");
const Medication = require("../models/medication-helpers.js");
const Messages = require("../models/messages-helpers.js");
const Provider = require("../models/relation-patient_physician-helpers.js");
let sess; //use this here


module.exports = {

  get_patient: (req, res) => {
    console.log("I'm Called 1");
    //Presets. Info will be returned at the end
    let info = {};
    //Need to reset req params here to account for variation
    req.params.id_patient = req.params.userid;
    req.params.uid = req.params.userid;

    Patient.get_patient(req.params, (err,patient)=>{
          console.log("I'm Called 2");
      if(err) console.log ("PATIENT ",err);
      info.patient = patient.length > 0 ? patient : "No patient information";

      //Get appointment information

      Appointment.get_one_appointment_by_pat_id(req.params, (error, appointment) => {
            console.log("I'm Called 3");
        if(error) console.log ("APPOINTMENT", error);
        info.appointment = appointment.length > 0 ? appointment : "No appointment information";


      Healthlog.get_all_health_logs_by_patient_id(req.params, (error, healthLog) => {
          console.log("I'm Called 4");
        if(error) console.log("HEALTHLOG", error);
        info.healthLog = healthLog.length > 0 ? healthLog : "No healthLog information available";

      Insurance.get_one_patientPlan(req.params, (error, insurance) =>{
              console.log("I'm Called 5");
        if(error) console.log("INSURANCE", error);
        info.insurance = insurance.length > 0 ? insurance : "No insurance information available";

       Medication.getAll_patient_medication(req.params, (error, medication) =>{
            console.log("I'm Called 6");
        if(error) console.log("MEDICATION", error);
        info.medication = medication.length > 0 ? medication: "No medication information available";

      Provider.get_all_physicians_of_patient(req.params, (error, provider) =>{
            console.log("I'm Called 7");
        if(error) console.log("PROVIDER", error);
        info.provider = provider.length > 0 ? provider : "No provider information available";

        res.json(info);

      });

      });

      });

      });

      });
    })
  }
};
