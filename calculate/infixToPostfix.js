"use strict";

// Convert infix to postfix expressions
const _ = require('lodash');

const constants = require('../constants');

const isValidSymbol = (symbol) => {
  return _.isNumber(symbol) ||
    constants.SUPPORTED_ARITHMETIC_SYMBOLS.includes(symbol);
};

const isFirstOperationOrderHigher = (firstOperation, secondOperation) => {
  return (
    constants.FISRT_ORDER_OPERATIONS.includes(firstOperation) &&
    constants.SECOND_ORDER_OPERATIONS.includes(secondOperation));
};

module.exports = (query) => {
  let postfix = [];
  let operationsStack = [];
  for (const symbol of query) {
    if (!isValidSymbol(symbol)) {
      throw new Error(`Symbol "${symbol}" is not supported`);
    }
    if (_.isNumber(symbol)) {
      postfix.push(symbol);
    } else if (symbol === constants.OPEN_BRACKET) {
      operationsStack.push(symbol);
    } else if (symbol === constants.CLOSE_BRACKET) {
      let lastOperation = operationsStack.pop();
      if (!lastOperation) { throw new Error('Unbalanced brackets'); }
      while (lastOperation && lastOperation !== constants.OPEN_BRACKET) {
        postfix.push(lastOperation)
        lastOperation = operationsStack.pop();
      }
    } else {
      while (
        (_.isEmpty(operationsStack) === false) &&
        (isFirstOperationOrderHigher(
          operationsStack[operationsStack.length - 1], symbol))) {
        postfix.push(operationsStack.pop());
      }
      operationsStack.push(symbol);
    }
  }
  if (operationsStack.includes(constants.OPEN_BRACKET)) {
    throw new Error('Unbalanced brackets');
  }
  const postfixQuery = postfix.concat(operationsStack.reverse());
  if (_.isEmpty(postfixQuery)) {
    throw new Error('Query expected but received empty brackets');
  }
  return postfixQuery;
};
