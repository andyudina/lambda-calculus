"use strict";

const expect = require('chai').expect,
  sinon = require('sinon');

const calculate = require('../api/controllers').calculate,
  controllers = require('../api/controllers'),
  utils = require('./_utils');

const generateQuery = (expression) => {
  return Buffer.from(expression).toString('base64');
};

describe('Calculate expression in request query', () => {

  it('200 OK returned on successful request', () => {
    const res = utils.createResponse();
    const req = { query: { query: generateQuery('5 - 2') } };
    calculate(req, res, null);
    expect(res.status.withArgs(200).calledOnce).to.be.true;
  });

  it('Valid number returned on successfull request', () => {
    const res = utils.createResponse();
    const req = { query: { query: generateQuery('5 - 2') } };
    calculate(req, res, null);
    const expectedResult = {
      error: false,
      result: '3.00'
    };
    console.log(res.json.getCall(0).args);
    expect(res.json.withArgs(expectedResult).calledOnce).to.be.true;
  });

  it('400 Bad request returned if query format is invalid', () => {
    const res = utils.createResponse();
    const req = { query: { query: generateQuery('5 - y') } };
    calculate(req, res, null);
    expect(res.status.withArgs(400).calledOnce).to.be.true;
  });

  it('422 Unprocessable entity returned if query can not be calculated', () => {
    const res = utils.createResponse();
    const req = { query: { query: generateQuery('5 / 0') } };
    calculate(req, res, null);
    expect(res.status.withArgs(422).calledOnce).to.be.true;
  });

  afterEach(() => {
    sinon.restore();
  });

});
