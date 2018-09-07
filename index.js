'use strict'

const api = require('lambda-api')()

const routes = require('./api/routes')

// Set up routes
routes(api)

exports.handler = (event, context, callback) => {
  api.run(event, context, callback)
}
