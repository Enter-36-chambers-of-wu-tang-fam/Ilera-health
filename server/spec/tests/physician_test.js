'use strict';


const httpStatus = require('http-status');
const chai = require('chai');
const expect = chai.expect;
const app = require('../../server.js');
const Physician = require('../../models/physician-helpers.js');
const physicianData = require('.././test_data/td_physician.js');
const Request = require('supertest')('http://localhost:5000');




describe('Physician queries', function(){

  describe('Webpack Spinning Up...', function() {
    before(function(done) {
      setTimeout(() => done(), 2500);
    });

    describe('POST /api/physician/signup', function() {

      it('It should let a new physician sign up for a new profile', function(done){

        const Physiciandata1 = Object.assign({}, physicianData.patient5);

        Request
          .post('/api/physician/signup')
          .send(Physiciandata1)
          .expect(httpStatus.OK)
          .end(function(error, res){
            if(error){
              return done(error);
            }
            expect(res.body.data[0].email).to.equal(physicianData.patient5.email)

            expect(res.body.data[0]).to.be.an('object');

          })

      })


      it('It should not let a physician sign up with an email that is already in use', function(done){

        const Physiciandata2 = Object.assign({}, physicianData.physician2);

        Request
          .post('/api/physician/signup')
          .send(Physiciandata2)
          .end(function(error, res){
            if(error){
              return done(error);
            }


            expect(res.body.data[0]).to.equal('The email address you specified is already in use.');

          })

      })
        // Physician

    })

    describe('GET /api/physician/signin', function() {

      it('It should let a registered Physician sign in', function(done){



        Request
          .get('/api/physician/signin')
          .send(Physiciandata)
          .end(function(error, res){
            if(error){
              return done(error);
            }

            expect(res.body.data).to.be.an('object');

          })

      })

      // Physician

  })


})
