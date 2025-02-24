const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/user');
const AuthController = require('../controllers/auth');

describe('Auth Controller - Login', () => {

  it('should throw an error with code 500 if accessing the database fails', (done)=>{
    sinon.stub(User, 'findOne');
    User.findOne.throws();

    const req = {
      body: {
        email: 'test@test.com',
        password: 'test'
      }
    };

    AuthController.login(req, {}, ()=>{}).then(result=>{
      expect(result).to.be.an('error');
      expect(result).to.have.property('statusCode', 500);
      done();
    });

    User.findOne.restore();
  })

  it('should send a response with a valid user status for an existing user', (done)=>{
    mongoose
      .connect(
        'mongodb+srv://maximilian:9u4biljMQc4jjqbe@cluster0-ntrwp.mongodb.net/test-messages?retryWrites=true'
      )
      .then(result => {
        const user = new User({
          email: 'test@test.com',
          password: 'test',
          name: 'test',
          posts: [],
        });
        return user.save();
      })
      .then()
      .catch(err => console.log(err));
  })

})