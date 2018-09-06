"use strict";

// Calculator logic
const _ = require('lodash');

const infixToPostfix = require ('./infixToPostfix'),
  constants = require('../constants');

const CalculateError = require('./error').CalculateError;

const SUPPORTED_OPERATIONS = {
  [constants.MULTIPLICATION]: (first, second) => first * second,
  [constants.DIVISION]: (first, second) => {
    if (second === 0) { throw new CalculateError('Can not divide by zero'); }
    return first / second;
  },
  [constants.ADDITION]: (first, second) => first + second,
  [constants.SUBTRACTION]: (first, second) => first - second,
};

const calculateOperation = (firstOperand, secondOperand, operation) => {
  const operationFunction = SUPPORTED_OPERATIONS[operation];
  if (!operationFunction) {
    throw new CalculateError(`Operation "${operation}" is not supported`);
  }
  return operationFunction(firstOperand, secondOperand);
}

module.exports = (query) => {
  // Calculate result of given query. Accepts array with numbers
  // and operations:  + - * / ( )
  if (_.isEmpty(query)) { throw new CalculateError('Query can not be empty'); }

  let calculationStack = [];
  const infixQuery = infixToPostfix(query);

  // Iterate over query
  for (const symbol of infixQuery) {
    if (_.isNumber(symbol)) {
      calculationStack.push(symbol);
    } else {
      const secondOperand = calculationStack.pop();
      const firstOperand = calculationStack.pop();
      const result = calculateOperation(firstOperand, secondOperand, symbol);
      calculationStack.push(result);
    }
  }

  return calculationStack.pop().toFixed(2);
};
