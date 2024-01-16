const OktaJwtVerifier = require('@okta/jwt-verifier');

exports.validateTokens = function (lambdaHandler) {
    return async function (event, context) {
        try {
            const accessToken = event.headers.Authorization
            const oktaJwtVerifier = new OktaJwtVerifier({
                issuer: '<placeholder>' // issuer required
            });
            await oktaJwtVerifier.verifyAccessToken(accessToken, 'api://default')
                .then( jwt => {
                    // the token is valid 
                    console.log(jwt.claims);
                })
                .catch( err => {
                    throw err
                });
        } catch (e) {
            console.error('Authorization header was missing or in an unrecognizable format :: ' + e.message)
            return {
                statusCode: 401,
                body: JSON.stringify({
                    message: "Invalid authorization header"
                })
            }
        }
        return await lambdaHandler(event, context)
    }
}