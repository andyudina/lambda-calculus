"use strict";

// Convert infix to postfix expressions
const _ = require('lodash');

const OPEN_BRACKET = '(';
const CLOSE_BRACKET = ')';

const isValidSymbol = (symbol) => {
  const supportedOperations = ['+', '-', '*', '/', '(', ')'];
  return _.isNumber(symbol) || supportedOperations.includes(symbol);
};

const isFirstOperationOrderHigher = (firstOperation, secondOperation) => {
  const firstOrderOperations = ['*', '/'];
  const secondOrderOperations = ['+', '-'];
  return (
    firstOrderOperations.includes(firstOperation) &&
    secondOrderOperations.includes(secondOperation));
}

module.exports = (query) => {
  let postfix = [];
  let operationsStack = [];
  for (const symbol of query) {
    if (!isValidSymbol(symbol)) {
      throw new Error(`Symbol "${symbol}" is not supported`);
    }
    if (_.isNumber(symbol)) {
      postfix.push(symbol);
    } else if (symbol === OPEN_BRACKET) {
      operationsStack.push(symbol);
    } else if (symbol === CLOSE_BRACKET) {
      let lastOperation = operationsStack.pop();
      if (!lastOperation) { throw new Error('Unbalanced brackets'); }
      while (lastOperation && lastOperation !== OPEN_BRACKET) {
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
  if (operationsStack.includes(OPEN_BRACKET)) {
    throw new Error('Unbalanced brackets');
  }
  const postfixQuery = postfix.concat(operationsStack.reverse());
  if (_.isEmpty(postfixQuery)) {
    throw new Error('Query expected but received empty brackets');
  }
  return postfixQuery;
}
