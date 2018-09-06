"use strict";

const expect = require('chai').expect;

const parse = require('../api/parse');

describe('Parse arythmetic expression', () => {

  it('Single number is parsed correctly', () => {
    const query = '2';
    expect(parse(query)).to.be.deep.equal(['2']);
  });

  it('Expression with spaces is parsed correctly', () => {
    const query = '2 + 3 - 7 / 5 * 10';
    expect(parse(query))
      .to.be.deep.equal(['2', '+', '3', '-', '7', '/', '5', '*', '10']);
  });

  it('Expression without spaces is parsed correctly', () => {
    const query = '2/3+5-6*11';
    expect(parse(query))
      .to.be.deep.equal(['2', '/', '3', '+', '5', '-', '6', '*', '11']);
  });

  it('Expression with brackets is parsed correctly', () => {
    const query = '(2+3) * (5)';
    expect(parse(query))
      .to.be.deep.equal(['(', '2', '+', '3', ')', '*', '(', '5', ')']);
  });

  it('Expression with long numbers is parsed correctly', () => {
    const query = '2222 + 33333 / 5';
    expect(parse(query))
      .to.be.deep.equal(['2222', '+', '33333', '/', '5']);
  });

  it('Expression with multiple spaces is parsed correctly', () => {
    const query = '2 +      3    / 5';
    expect(parse(query))
      .to.be.deep.equal(['2', '+', '3', '/', '5']);
  });

});
