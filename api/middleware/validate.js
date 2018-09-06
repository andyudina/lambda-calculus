"use strict";

const HttpStatus = require('http-status-codes');

const constructErrorResponse = require('../response/errors').constructErrorResponse;

module.exports.validateQuery = (expectedQueryParam) => {
  // Validate that query param is not null
  // Return 400 bad reques is param is missing
  return (req, res, next) => {
    if (req.query[expectedQueryParam]) { next(); }
    else {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json(constructErrorResponse(`${expectedQueryParam} is missing`));
    }
  };
};
