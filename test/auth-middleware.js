const expect = require('chai').expect;
const authMiddleware = require('../middleware/is-auth');
const res = require('express/lib/response')

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

  it('should throw an error if the token cannot be verified', ()=>{
    const req = {
      get: function (headerName) {
        return 'Bearer xyz';
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
    authMiddleware(req, {}, ()=>{});
    expect(req).to.have.property('userId');
  })

})

