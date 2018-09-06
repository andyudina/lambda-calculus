"use strict";

module.exports = (query) => {
  // Parse arithmetic expression and return array with numbers and operations
  // Do not validate result
  return query
    .split(/([\*+-/ \(\)])/)
    .filter(symbol => (symbol !== ' ' && symbol !== ''));
};
