const express = require('express');
const parser = require('body-parser');
const PORT = 3000;
const SSLPORT = 3030;
const path = require('path');
const router = require('./routes');
const cors = require('cors');
const LocalStrategy = require("passport-local").Strategy;
const app = express();
const https = require('https');
const http = require('http');
const cookieParser = require("cookie-parser");
var flash = require("connect-flash");
// const passport = require('./passport.js');

const { STRIPE_API_KEY } = require('../STRIPE_CONFIG.js');
const stripe = require('stripe')(STRIPE_API_KEY);

app.use(parser.text());
app.use(parser.json());
app.use(parser.urlencoded({extended:true}));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(cookieParser());
// app.use(flash());
app.use(cors());
app.use(express.static(path.join(__dirname + "/../../park-share-ui/client/dist/")));
app.use('/api',router);

app.use(function(err,req,res,next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

http.createServer(app).listen(PORT, console.log('HTTP LISTENING TO', PORT));
https.createServer(app).listen(SSLPORT, console.log('HTTPS LISTENING TO', SSLPORT));
