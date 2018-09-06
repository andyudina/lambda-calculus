"use strict";

const api = require('lambda-api')();

const routes = require('./api/routes');

// Set up routes
routes(api);

exports.handler = async (event, context) => {
  return await api.run(event, context);
};
