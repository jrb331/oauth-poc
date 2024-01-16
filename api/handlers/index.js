const validateTokens = require('./validate-tokens').validateTokens

module.exports.handler = validateTokens(async (event) => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Go Serverless v3.0! Your function executed successfully!",
          input: event,
        },
        null,
        2
      ),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode,
      body: error.body
    }
  }

});
