exports.handler = (event, context, callback) => {
  // Test handler for lambda function
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!')
  };
  callback(null, response);
};