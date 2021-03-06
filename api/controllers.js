'use strict'

const HttpStatus = require('http-status-codes')

const constructErrorResponse = require('./response/errors').constructErrorResponse

const decode = require('./request/decode')

const parse = require('./request/parse')

const clean = require('./request/clean')

const calculate = require('../calculate')

const calculateExpression = (query) => {
  // Parse and calculate query
  // Throw RequestError if can not process query
  // Throw CalculateError if can not calculate result
  const decodedQuery = decode(query)
  const parsedQuery = parse(decodedQuery)
  const expression = clean(parsedQuery)
  return calculate(expression)
}

module.exports.calculate = (req, res, next) => {
  // Parse and calculate expression in query string
  const query = req.query.query
  let number
  try {
    number = calculateExpression(query)
  } catch (error) {
    if (error.name === 'RequestError') {
      // Can not parse and clean request
      res
        .status(HttpStatus.BAD_REQUEST)
        .json(constructErrorResponse(error.message))
      return
    } else if (error.name === 'CalculateError') {
      // Can not calculate expression in query
      res
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .json(constructErrorResponse(error.message))
      return
    } else {
      // Use default error handler for unexpected error
      next(error)
      return
    }
  }
  res
    .status(HttpStatus.OK)
    .json({ error: false, result: number })
}
