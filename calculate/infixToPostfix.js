'use strict'

// Convert infix to postfix expressions

const _ = require('lodash')

const constants = require('../constants')

const CalculateError = require('./error').CalculateError

const isValidSymbol = (symbol) => {
  return _.isNumber(symbol) ||
    constants.SUPPORTED_ARITHMETIC_SYMBOLS.includes(symbol)
}

const isFirstOrderOperation = (operation) => {
  return constants.FISRT_ORDER_OPERATIONS.includes(operation)
}

const findLastNotFirstOrderOperation = (opStack) => {
  // Return last index of second order operation or bracktes
  // returns -1 if all operations are first order
  const operations = [
    ...constants.SECOND_ORDER_OPERATIONS,
    constants.OPEN_BRACKET,
    constants.CLOSE_BRACKET
  ]
  const indexes = operations
    .map(operation => opStack.lastIndexOf(operation))
  return Math.max(...indexes)
}

const processOneSymbol = (symbol, postfix, operationStack) => {
  // Helper to process one symbol from expression
  // Processes symbol according to current state of operations stack
  // and postfix stack
  // Returns new postfix and operationStack
  if (!isValidSymbol(symbol)) {
    throw new CalculateError(`Symbol "${symbol}" is not supported`)
  }
  // Process number
  if (_.isNumber(symbol)) {
    postfix = [...postfix, symbol]
    return { postfix, operationStack }
  }
  // Process open bracket
  if (symbol === constants.OPEN_BRACKET) {
    operationStack = [...operationStack, symbol]
    return { postfix, operationStack }
  }
  // Process close bracket
  if (symbol === constants.CLOSE_BRACKET) {
    if (!operationStack.includes(constants.OPEN_BRACKET)) {
      // Throw error if we got closing bracket without corresponding
      // opening one
      throw new CalculateError('Unbalanced brackets')
    }
    const openBracketIndex = operationStack.lastIndexOf(constants.OPEN_BRACKET)
    postfix = [
      ...postfix,
      // Add all operation between brackets in reversed order
      ...operationStack.slice(openBracketIndex + 1).reverse()
    ]
    operationStack = operationStack.slice(0, openBracketIndex)
    return { postfix, operationStack }
  }
  // Process arithmetic operation
  // Find all subsequent operations in the end of operationStack
  // that are higher order than current operation
  if (isFirstOrderOperation(symbol) || _.isEmpty(operationStack)) {
    // If operation has the highest order
    // No operations in operations stack can be higher order
    operationStack = [...operationStack, symbol]
    return { postfix, operationStack }
  }
  const lastNotFirstOrderOpIndex = findLastNotFirstOrderOperation(operationStack)
  if (lastNotFirstOrderOpIndex === -1) {
    // All operations are first order
    // Append all operations to postfix expression in reverse order
    // And return empty operations stack
    postfix = [...postfix, ...operationStack.reverse()]
    operationStack = [ symbol ]
    return { postfix, operationStack }
  }
  postfix = [
    ...postfix,
    // Add all first order operations after last second order operation
    ...operationStack.slice(lastNotFirstOrderOpIndex + 1).reverse()
  ]
  operationStack = [
    ...operationStack.slice(0, lastNotFirstOrderOpIndex + 1),
    symbol]
  return { postfix, operationStack }
}

module.exports = (query) => {
  // Covert expression from infix to postfix format
  let postfix = []
  let operationStack = []
  for (const symbol of query) {
    const result = processOneSymbol(symbol, postfix, operationStack)
    postfix = result.postfix
    operationStack = result.operationStack
  }
  // Check if open brackets left in operations stack
  // and through "unbalanced brackets" error
  if (operationStack.includes(constants.OPEN_BRACKET)) {
    throw new CalculateError('Unbalanced brackets')
  }
  // Append all opeations in the end of postfix expression
  const postfixQuery = postfix.concat(operationStack.reverse())
  // Throw error if result postfix expression is empty
  // it means that expression consisted of only brackets
  if (_.isEmpty(postfixQuery)) {
    throw new CalculateError('Query expected but received empty brackets')
  }
  return postfixQuery
}
