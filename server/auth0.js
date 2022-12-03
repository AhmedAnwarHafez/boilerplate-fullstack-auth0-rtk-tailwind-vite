const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
const { ManagementClient } = require('auth0')
const dotenv = require('dotenv')
const request = require('superagent')

dotenv.config()

// TODO: set the domain and audience (API Identifier)
const domain = 'https://dev-l15ujwk4.au.auth0.com'
const audience = 'https://fruits/api'
const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${domain}/.well-known/jwks.json`,
  }),
  audience: audience,
  issuer: `${domain}/`,
  algorithms: ['RS256'],
})

// https://auth0.github.io/node-auth0/ManagementClient.html
const managementDomain = 'dev-l15ujwk4.au.auth0.com'
const managementAudience = 'https://dev-l15ujwk4.au.auth0.com/api/v2/'
const clientId = 'EqeUttJVHV41MvTLpMJZK1S6oGCyILz6'
const clientSecret = process.env.AUTH0_API_SECRET || 'empty-secret'
const scope = 'read:users'

const management = new ManagementClient({
  domain: managementDomain,
  audience: managementAudience,
  clientId,
  clientSecret,
  scope,
  tokenProvider: {
    enableCache: true,
    cacheTTLInSeconds: 10,
  },
})

async function getUser(id) {
  const user = await management.getUser({ id })
  return user.user_metadata
}

async function updateUser(id, userDetails) {
  await management.updateUserMetadata(
    { id },
    { user_metadata: { ...userDetails } }
  )
  return await getUser(id)
}

module.exports = {
  checkJwt,
  getUser,
  updateUser,
}
