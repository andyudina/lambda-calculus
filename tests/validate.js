"use strict";

const expect = require('chai').expect,
  sinon = require('sinon');

const validateQuery = require('../middleware/validate').validateQuery,
  utils = require('./_utils');

describe('Validate that query parameter exists', () => {

  it('Call next function if parameter exist', () => {
    const query = 'query';
    const validate = validateQuery(query);

    const req = {
      query: { query }
    };
    const nextSpy = sinon.spy();

    validate(req, null, nextSpy);
    expect(nextSpy.calledOnce).to.be.true;
  });

  it('Return 400 bad request if parameter does not exist', () => {
    const validate = validateQuery('query');
    const req = { query: { } };
    const res = utils.createResponse();
    
    validate(req, res, null);
    expect(res.status.withArgs(400).calledOnce).to.be.true;
  });

  it('Return error message if parameter doesn\'t exist', () => {
    const validate = validateQuery('query');
    const req = { query: { } };
    const res = utils.createResponse();
    
    validate(req, res, null);
    const expectedError = {
      error: true,
      message: 'query is missing'
    };
    expect(res.json.withArgs(expectedError).calledOnce).to.be.true;
  });

  afterEach(() => {
    sinon.restore();
  });

});
