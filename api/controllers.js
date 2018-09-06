"use strict";

module.exports.calculate = (req, res) => {
  // Parse and caclulate expression in query string
  const query = req.query.query;
  res
    .status(200)
    .json({query: query});
}