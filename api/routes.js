"use strict";

const controllers = require('./controllers');

const validateQueryMiddleware = require('./middleware/validate').validateQuery;

module.exports = (api) => {
  // Set up routes
  api.use('/calculus',validateQueryMiddleware('query'));
  api.get('/calculus', controllers.calculate);
};
