'use strict'

const controllers = require('./controllers')

const handleUnknownError = require('./response/errors').handleUnknownError

const validateQueryMiddleware = require('./middleware/validate').validateQuery

module.exports = (api) => {
  // Set up routes
  api.use('/calculus', validateQueryMiddleware('query'))
  api.get('/calculus', controllers.calculate)

  // Add custom error handler
  api.use(handleUnknownError)
}
