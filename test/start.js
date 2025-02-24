const expect = require('chai').expect;

it('should add numbers correctly', () => {
  const num1 = 2;
  const num2 = 3;
  expect(num1+num2).to.eql(5);
})

it('should not give a result og 6', () => {
  const num1 = 2;
  const num2 = 3;
  expect(num1+num2).not.to.eql(6);
})