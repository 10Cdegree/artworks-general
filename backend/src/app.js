const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const Google = require("passport-google-oauth2").Strategy;
const passport = require("passport");

const app = express();

// COMMON MIDDLEWARE
app.use(morgan("dev"));

app.use(
  session({
    secret: "randomsecretkey",
    saveUninitialized: false,
    resave: false,
  })
);

//GOOGLE AUTH
passport.use(
  new Google(
    {
      clientID:
        "REDACTED",
      clientSecret: "REDACTED",
      callbackURL: "http://localhost:3000/google/callback",
    },
    (req, actoken, reftoken, profile, done) => {
      console.log(profile);
      done(null, profile);
    }
  )
);

app.get("/google", passport.authenticate("google", { scope: ["email"] }));

app.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.json(req.user);
});

app.use(express.json());

module.exports = app;
