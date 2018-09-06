"use strict";

const _ = require('lodash');

const constants = require('../../constants');

const cleanSymbol = (symbol) => {
  // Convert number to integer, validate that operation is supported
  // and throw error if symbol is not supported
  // Warning: do not support empty string
  if (_.isInteger(+symbol)) { return parseInt(symbol); }
  if (constants.SUPPORTED_ARITHMETIC_SYMBOLS.includes(symbol)) {
    return symbol;
  }
  throw new Error(`Symbol "${symbol}" is not supported`);
}

module.exports = (expression) => {
  // Clean arithmetic expression
  // Throws error if non integer or not supported symbol found
  return expression.map(cleanSymbol)
};
