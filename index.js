"use strict";

const api = require('lambda-api')();

const routes = require('./api/routes');

// Set up routes
routes(api);

exports.handler = async (event, context) => {
  // Test handler for lambda function
  return await api.run(event, context);
};