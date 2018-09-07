'use strict'

// Calculator logic

const _ = require('lodash')

const infixToPostfix = require('./infixToPostfix')

const constants = require('../constants')

const CalculateError = require('./error').CalculateError

const SUPPORTED_OPERATIONS = {
  [constants.MULTIPLICATION]: (first, second) => first * second,
  [constants.DIVISION]: (first, second) => {
    if (second === 0) { throw new CalculateError('Can not divide by zero') }
    return first / second
  },
  [constants.ADDITION]: (first, second) => first + second,
  [constants.SUBTRACTION]: (first, second) => first - second
}

const calculateOperation = (firstOperand, secondOperand, operation) => {
  const operationFunction = SUPPORTED_OPERATIONS[operation]
  if (!operationFunction) {
    throw new CalculateError(`Operation "${operation}" is not supported`)
  }
  return operationFunction(firstOperand, secondOperand)
}

const processOneSymbol = (symbol, calculationStack) => {
  // Helper to process one symbol from infix expression
  // Returns updated calculation stack
  // Add number to stack
  if (_.isNumber(symbol)) {
    return [...calculationStack, symbol]
  }
  // Get last two numbers from stack and perform operation using them
  const secondOperand = calculationStack[calculationStack.length - 1]
  const firstOperand = calculationStack[calculationStack.length - 2]
  if (!_.isNumber(secondOperand) || !_.isNumber(firstOperand)) {
    throw new CalculateError('Postfix expression has invalid format')
  }
  const result = calculateOperation(firstOperand, secondOperand, symbol)
  return [
    ...calculationStack.slice(0, calculationStack.length - 2),
    result]
}

module.exports = (query) => {
  // Calculate result of the given query. Accepts array with numbers
  // and operations:  + - * / ( )
  if (_.isEmpty(query)) { throw new CalculateError('Query can not be empty') }

  let calculationStack = []
  const infixQuery = infixToPostfix(query)

  // Iterate over query
  for (const symbol of infixQuery) {
    calculationStack = processOneSymbol(symbol, calculationStack)
  }

  return calculationStack.pop().toFixed(2)
}
