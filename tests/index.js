"use strict";

const expect = require('chai').expect,
  sinon = require('sinon');

const handler = require('../index').handler;

describe('Lambda request handler', () => {

  it('Valid response returned', () => {
    const callbackSpy = sinon.spy();
    handler(null, null, callbackSpy);
    const expectedResponse = {
      statusCode: 200,
      body: '"Hello from Lambda!"'
    };
    expect(callbackSpy.withArgs(null, expectedResponse).calledOnce).to.be.true;
  });

  afterEach(() => {
    sinon.restore();
  });
});
