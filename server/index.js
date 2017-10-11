const express = require('express');
const session = require('express-session');
const passport = require('passport');
const request = require('request');
const strategy = require('./strategy');

const app = express();
app.use( session({
  secret: '@nyth!ng y0u w@nT',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize() );
app.use(passport.session() );
passport.use( strategy );

passport.serializeUser((user,done) => {
  const {_json} = user;
  done(null, {clientID: _json.clientID, email: _json.email, name: _json.name, followers: _json.followers_url})
})

passport.deserializeUser( (obj, done) => {
  done(null, obj);
})

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
  successRedirect: 'http://localhost:3030/followers', 
  failureRedirect: 'http://localhost:3030/login', 
  failureFlash: true, 
  connection: 'github' }
)
);

app.get('/followers', ( req, res, next ) => {
  if ( req.user ) {
    const FollowersRequest = {
      url: req.user.followers,
      headers: {
        'User-Agent': req.user.clientID
      }
    };

    request(FollowersRequest, ( error, response, body ) => {
      res.status(200).send(body);
    });
  } else {
    res.redirect('/auth');
  }
});



const port = 3030;
app.listen( port, () => { console.log(`Server listening on port ${port}`); } );