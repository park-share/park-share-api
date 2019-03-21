const express = require('express');
const parser = require('body-parser');
const PORT = 3000;
const path = require('path');
const router = require('./routes');
const cors = require('cors');
var request = require('request');
const app = express();
const passport = require("passport");

app.use(parser.json());
app.use(parser.urlencoded({extended:false}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(express.static(path.join(__dirname,'..')))
app.use(express.static(path.join(__dirname + "/../../park-share-ui/client/dist/")));
app.use('/api',router);

app.listen(PORT,console.log('listen to the port', PORT));