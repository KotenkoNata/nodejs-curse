const expect = require('chai').expect;
const authMiddleware = require('../middleware/is-auth');
const jwt = require('jsonwebtoken');
const sinon = require('sinon');

describe('Auth Middleware', () => {

  it('should throw an error if no authorization header is provided', () => {
    const req = {
      get: function () {
        return null;
      }
    }
    expect(authMiddleware.bind(this, req, {}, ()=>{})).to.throw('Not authenticated.');
  })

  it('should throw an error if the authorization header is only one string', ()=>{
    const req = {
      get: function () {
        return 'xyz';
      }
    }
    expect(authMiddleware.bind(this, req, {}, ()=>{})).to.throw();
  })

  it('should yield a userId after decoding the token', ()=>{
    const req = {
      get: function (headerName) {
        return 'Bearer xyzsdsdgdfgdlfkgjsdf';
      }
    }
    sinon.stub(jwt, 'verify');

    jwt.verify.returns({
      userId: 'sdhf'
    })

    authMiddleware(req, {}, ()=>{});
    expect(req).to.have.property('userId');
    expect(req).to.have.property('userId', 'sdhf');
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
  })

  it('should throw an error if the token cannot be verified', ()=>{
    const req = {
      get: function (headerName) {
        return 'Bearer xyz';
      }
    }
    expect(authMiddleware.bind(this, req, {}, ()=>{})).to.throw();
  })

})

