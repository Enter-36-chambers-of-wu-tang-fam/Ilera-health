'use strict';


const httpStatus = require('http-status');
const chai = require('chai');
const expect = chai.expect;
const app = require('../../server.js');
const Patient = require('../../models/patient-helpers.js');
const patientData = require('.././test_data/td_patient.js');
const Request = require('supertest')('http://localhost:4000');




describe('Patient queries', function(){

  describe('Webpack Spinning Up...', function() {
    before(function(done) {
      setTimeout(() => done(), 2500);
    });

    describe('POST /api/patient/signup', function() {

      it('It should let a new patient sign up for a new profile', function(done){

        const patientData1 = Object.assign({}, patientData.patient5);

        Request
          .post('/api/patient/signup')
          .send(patientData1)
          .expect(httpStatus.OK)
          .end(function(error, res){
            if(error){
              return done(error);
            }
            expect(res.body.data[0].email).to.equal(patientData.patient5.email)

            expect(res.body.data[0]).to.be.an('object');

          })

      })


      it('It should not let a patient sign up with an email that is already in use', function(done){

        const patientData2 = Object.assign({}, patientData.patient6);

        Request
          .post('/api/patient/signup')
          .send(patientData2)
          .end(function(error, res){
            if(error){
              return done(error);
            }


            expect(res.body.data[0]).to.equal('The email address you specified is already in use.');

          })

      })
        // Patient

    })

    describe('GET /api/patient/signin', function() {

      it('It should let a registered Patient sign in', function(done){



        Request
          .get('/api/patient/signin')
          .send(patientData1)
          .end(function(error, res){
            if(error){
              return done(error);
            }

            expect(res.body.data).to.be.an('object');

          })

      })

      // Patient

  })


})
