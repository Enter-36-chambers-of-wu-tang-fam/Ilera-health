'use strict'

const Appointment = require('../models/appointment-helpers.js');

module.exports = {

  postAppointment: (req, res) => {
    Appointment.make_appointment(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  getOne_AppointmentByPat_id:(req, res) => {
    Appointment.get_one_appointment_by_pat_id(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  getAll_appointmentByPhY_id:(req, res) => {
    Appointment.get_all_appointment_by_phY_id(req.params, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  updateAppointment:(req, res) => {
    Appointment.update_appointment(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  },

  cancelAppointment: (req, res) => {
    Appointment.cancel_appointment(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  }

  // (req, res) => {
  //   Appointment.make_appointment(req.body, (err,data)=>{
  //     if(err) console.log(err);
  //     res.json(data);
  //   });
  // },
};
