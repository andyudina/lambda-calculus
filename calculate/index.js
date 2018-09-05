"use strict";

// Calculator logic
const _ = require('lodash');

const infixToPostfix = require ('./infixToPostfix');

const SUPPORTED_OPERATIONS = {
  '*': (first, second) => first * second,
  '/': (first, second) => {
    if (second === 0) { throw new Error('Can not divide by zero'); }
    return first / second;
  },
  '+': (first, second) => first + second,
  '-': (first, second) => first - second,
};

const calculateOperation = (firstOperand, secondOperand, operation) => {
  const operationFunction = SUPPORTED_OPERATIONS[operation];
  if (!operationFunction) {
    throw new Error(`Operation "${operation}" is not supported`);
  }
  return operationFunction(firstOperand, secondOperand);
}

module.exports = (query) => {
  // Calculate result of given query. Accepts array with numbers
  // and operations:  + - * / ( )
  if (_.isEmpty(query)) { throw new Error('Query can not be empty'); }

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
}
