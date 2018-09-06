"use strict";

const controllers = require('./controllers');

module.exports = (api) => {
  // Set up routes
  api.get('/calculus', controllers.calculate);
};
