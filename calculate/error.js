'use strict'

// Calculation related errors

class CalculateError extends Error {
  constructor (message) {
    super(message)
    this.name = 'CalculateError'
  }
};

module.exports = {
  CalculateError
}
