const express = require('express');
const parser = require('body-parser');
const PORT = 3000;
const path = require('path');
const router = require('./routes');
const app = express();

app.use(parser.json());
app.use(parser.urlencoded({extended:false}));
// app.use(express.static(path.join(__dirname,'..')))
app.use(express.static(path.join(__dirname + "/../park-share-ui/client/dist/")));
app.use('/api',router);
app.listen(PORT,console.log('listen to the port', PORT));