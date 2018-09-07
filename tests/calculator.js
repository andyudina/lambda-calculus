/* eslint-env mocha */
'use strict'

const expect = require('chai').expect

const calculate = require('../calculate')

describe('Calculator', () => {
  // Single numbers

  it('Positive single number returned', () => {
    const calculateRequest = [2]
    expect(calculate(calculateRequest)).to.be.equal('2.00')
  })

  it('Negative single number returned', () => {
    const calculateRequest = [-2]
    expect(calculate(calculateRequest)).to.be.equal('-2.00')
  })

  // Basic calculations

  it('Sum was calculated correctly', () => {
    const calculateRequest = [2, '+', 4]
    expect(calculate(calculateRequest)).to.be.equal('6.00')
  })

  it('Subtraction was calculated correctly', () => {
    const calculateRequest = [2, '-', 4]
    expect(calculate(calculateRequest)).to.be.equal('-2.00')
  })

  it('Multiplication was calculated correctly', () => {
    const calculateRequest = [2, '*', 4]
    expect(calculate(calculateRequest)).to.be.equal('8.00')
  })

  it('Division was calculated correctly', () => {
    const calculateRequest = [1, '/', 2]
    expect(calculate(calculateRequest)).to.be.equal('0.50')
  })

  // Order of operations

  it('Division is calculated first', () => {
    const calculateRequest = [5, '+', 4, '/', 2]
    expect(calculate(calculateRequest)).to.be.equal('7.00')
  })

  it('Multiplication is calculated first', () => {
    const calculateRequest = [5, '+', 4, '*', 2]
    expect(calculate(calculateRequest)).to.be.equal('13.00')
  })

  it('Multiplication and division have same priority', () => {
    const calculateRequest = [5, '*', 4, '/', 2]
    expect(calculate(calculateRequest)).to.be.equal('10.00')
  })

  // Using brackets

  it('Operations in brackets was calculated successfully', () => {
    const calculateRequest = ['(', 2, '+', 4, ')']
    expect(calculate(calculateRequest)).to.be.equal('6.00')
  })

  it('Operations in brackets has top priority', () => {
    const calculateRequest = ['(', 2, '+', 4, ')', '*', 10]
    expect(calculate(calculateRequest)).to.be.equal('60.00')
  })

  it('Support multiple levels of brackets', () => {
    const calculateRequest = [0, '+', '(', 1, '+', 2, '*', '(', 3, '+', 5, ')', ')']
    expect(calculate(calculateRequest)).to.be.equal('17.00')
  })

  it('Throw error if division by zero occurred', () => {
    const calculateRequest = [1, '/', 0]
    expect(() => { calculate(calculateRequest) })
      .to.throw('Can not divide by zero')
  })

  it('Throw error if query is empty', () => {
    const calculateRequest = []
    expect(() => { calculate(calculateRequest) })
      .to.throw('Query can not be empty')
  })
})
