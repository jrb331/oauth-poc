# Welcome to oauth-poc!

This is a basic proof of concept repo I created to play around with the OAuth2.0 client credentials flow.

This project uses the Serverless Framework and Node.js to create an API Gateway in AWS. It also uses Okta as its OAuth2.0 authentication server.

## How it works:

1. The client requests the `/authorize` endpoint of the API with a base64 encoding of their client credentials as an `Authorization` header.
   1. e.g. `echo -n clientid:clientsecret | base64` in Linux
2. If the authorization server recognizes the client id/secret combo as valid, it will return an `access_token` in the its response. Otherwise, it will return a 401.
   1. The `/authorize` endpoint can be called at any time to receive a new access token.
   2. Each access token is valid for one hour.
3. In order to reach the other endpoints in the API, the client must include the `access_token` as an `Authorization` header in all requests.
   1. Each endpoint other than `/authorize` is wrapped in a token validator which reads this `Authorization` header and ensures the passed `access_token` is valid before passing execution to the called endpoint.
   2. If the `access_token` is not valid, the token validator will return a 401 and execution will not be passed to the called endpoint.
