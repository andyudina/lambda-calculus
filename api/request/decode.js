"use strict";

module.exports = (query) => {
  // Decode base64 with utf-8 encoding
  return Buffer
    .from(query, 'base64')
    .toString('utf8')
};
