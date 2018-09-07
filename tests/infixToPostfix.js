/* eslint-env mocha */
'use strict'

const expect = require('chai').expect

const infixToPostfix = require('../calculate/infixToPostfix')

describe('Convert infix notation to postfix', () => {
  it('Single number is converted to itself', () => {
    const calculateRequest = [2]
    expect(infixToPostfix(calculateRequest)).to.be.deep.equal([2])
  })

  it('Two numbers with one operation converted correctly', () => {
    const calculateRequest = [2, '+', 3]
    expect(infixToPostfix(calculateRequest)).to.be.deep.equal([2, 3, '+'])
  })

  it('Operations with different order converted successfully', () => {
    const calculateRequest = [2, '*', 3, '+', 5, '*', 1]
    expect(infixToPostfix(calculateRequest))
      .to.be.deep.equal([2, 3, '*', 5, 1, '*', '+'])
  })

  it('Operations with brackets converted successfully', () => {
    const calculateRequest = [2, '*', '(', 3, '+', 5, ')']
    expect(infixToPostfix(calculateRequest))
      .to.be.deep.equal([2, 3, 5, '+', '*'])
  })

  //  Errors

  it('Throw error on not supported symbol', () => {
    const calculateRequest = [1, '(', 'y', ')']
    expect(() => { infixToPostfix(calculateRequest) })
      .to.throw('Symbol "y" is not supported')
  })

  it('Throw error on unbalanced brackets', () => {
    const calculateRequest = ['(', 1, '+', 2]
    expect(() => { infixToPostfix(calculateRequest) })
      .to.throw('Unbalanced brackets')
  })

  it('Throw error if brackets are empty', () => {
    const calculateRequest = ['(', '(', ')', ')']
    expect(() => { infixToPostfix(calculateRequest) })
      .to.throw('Query expected but received empty brackets')
  })
})
