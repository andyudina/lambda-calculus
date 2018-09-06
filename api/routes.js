"use strict";

const controllers = require('./controllers');

const validateQueryMiddleware = require('./middleware/validate').validateQuery;

module.exports = (api) => {
  // Set up routes
  api.get(
    '/calculus',
    validateQueryMiddleware('query'),
    controllers.calculate);
};
