'use strict';


const httpStatus = require('http-status');
const chai = require('chai');
const expect = chai.expect;
const app = require('../../server.js');
const Physician = require('../../models/physician-helpers.js');
const patientData = require('.././test_data/td_patient.js');
const Request = require('supertest')('http://localhost:5000');




describe('Physician queries', function(){

  describe('Webpack Spinning Up...', function() {
    before(function(done) {
      setTimeout(() => done(), 2500);
    });

  describe('POST /api/physician/signup', function() {
    const newPhysician = {
      first: 'raekwon',
      last: 'etemad',
      email: 'raekwon@gmailo.com',
      password: 'neekonetemad'
    };

    Request
      .post('/api/physician/signup')
      .send(newPatient)
      .expect(httpStatus.OK)
      .end(function(error, res){
        if(error){
          return done(error);
        }

        expect(res.body.data).to.be.an('object');

      })

      // Physician

  })

  describe('GET /api/physician/signin', function() {
    // const newPatient = {
    //   first: 'raekwon',
    //   last: 'etemad',
    //   email: 'raekwon@gma.com',
    //   password: 'neekonetemad'
    // };

    Request
      .get('/api/physician/signin')
      .send(newPatient)
      .expect(httpStatus.OK)
      .end(function(error, res){
        if(error){
          return done(error);
        }

        expect(res.body.data).to.be.an('object');

      })

      // Physician

  })


})
