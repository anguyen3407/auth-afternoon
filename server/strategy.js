const Auth0Strategy = require('passport-auth0');
const config = require(`${__dirname}/config.js`);
const { domain, clientID, clientSecret } = config;

module.exports = new Auth0Strategy({
   domain:       'annienguyen.auth0.com',
   clientID:     '8EsamKaKwkTAwVvk1KN90xFNE03yDRkS',
   clientSecret: '',
   callbackURL:  'http://localhost:3030/auth/callback'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
  }
);