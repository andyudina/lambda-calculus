"use strict";

const HttpStatus = require('http-status-codes');

const constructErrorResponse = (message) => ({
  error: true,
  message: message
});

module.exports.constructErrorResponse = constructErrorResponse;

module.exports.handleUnknownError = (err, req, res, next) => {
  // Default handler for errors
  console.log(err);
  res
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .json(constructErrorResponse('Unknown error occured'));
  next();
};
