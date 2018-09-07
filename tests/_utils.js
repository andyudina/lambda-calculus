'use strict'

const sinon = require('sinon')

module.exports.createResponse = () => {
  const res = {
    json: sinon.spy()
  }
  res.status = sinon.stub().returns(res)
  return res
}
