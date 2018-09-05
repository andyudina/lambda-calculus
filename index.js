exports.handler = (event, context, callback) => {
  // Test handler for lanbda function
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!')
  };
  callback(null, response);
};