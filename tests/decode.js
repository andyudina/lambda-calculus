"use strict";

const expect = require('chai').expect;

const decode = require('../api/request/decode');

describe('Decode base64 query with utf8 encoding', () => {

  it('Query decoded successfully', () => {
    const query = 'MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk=';
    expect(decode(query)).to.be.equal('2 * (23/(3*3))- 23 * (2*3)');
  });

});
