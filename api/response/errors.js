"use strict";

module.exports.constructErrorResponse = (message) => ({
  error: true,
  message: message
});
