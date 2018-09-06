"use strict";

const expect = require('chai').expect;

const clean = require('../api/clean');

describe('Clean arythmetic expression', () => {

  it('Numbers are cleaned correctly', () => {
    const query = ['2'];
    expect(clean(query)).to.be.deep.equal([2]);
  });

  it('Arithmetic operations are cleaned correctly', () => {
    const query = ['2', '+', '10', '-', '11', '*', '12' / '2'];
    expect(clean(query))
      .to.be.deep.equal([2, '+', 10, '-', 11, '*', 12 / 2]);
  });

  it('Throw error if unknown symbol found', () => {
    const query = ['2.12', '+', '12'];
    expect(() => clean(query))
      .to.throw('Symbol "2.12" is not supported');
  });

});
