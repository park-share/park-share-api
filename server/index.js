const express = require('express');
const parser = require('body-parser');
const PORT = 3000;
const SSLPORT = 3030;
const path = require('path');
const router = require('./routes');
const app = express();

const https = require('https');
const http = require('http');

app.use(parser.json());
app.use(parser.urlencoded({extended:false}));
// app.use(express.static(path.join(__dirname,'..')))
app.use(express.static(path.join(__dirname + "/../park-share-ui/client/dist/")));
app.use('/api',router);

http.createServer(app).listen(PORT, console.log('HTTP LISTENING TO', PORT));
https.createServer(app).listen(SSLPORT, console.log('HTTPS LISTENING TO', SSLPORT));
