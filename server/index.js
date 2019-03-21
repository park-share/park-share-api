const express = require('express');
const parser = require('body-parser');
const PORT = 3000;
const SSLPORT = 3030;
const path = require('path');
const router = require('./routes');
const cors = require('cors');
var request = require('request');
const app = express();
const passport = require("passport");

const https = require('https');
const http = require('http');

const https = require('https');
const http = require('http');

app.use(parser.json());
app.use(parser.urlencoded({extended:false}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(express.static(path.join(__dirname,'..')))
app.use(express.static(path.join(__dirname + "/../../park-share-ui/client/dist/")));
app.use('/api',router);

http.createServer(app).listen(PORT, console.log('HTTP LISTENING TO', PORT));
https.createServer(app).listen(SSLPORT, console.log('HTTPS LISTENING TO', SSLPORT));
