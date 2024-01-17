const axios = require('axios');

exports.authorize = async (event) => {
  try {
    response = await axios.post('<placeholder>/oauth2/default/v1/token', 'grant_type=client_credentials&scope=testScope', {
      headers: {
          'accept': 'application/json',
          'authorization': 'Basic ' + event.headers.Authorization,
          'cache-control': 'no-cache',
          'content-type': 'application/x-www-form-urlencoded'
      },
    });
    return {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: "Successfully called authorizer",
            input: response.data,
          },
          null,
          2
        ),
    }
  } catch (error) {
    console.error(error);
    return {
        statusCode: 403,
        body: JSON.stringify(
            {
                message: "Access Denied",
                error: error.message,
            },
            null,
            2
        ),
    };
  }
};