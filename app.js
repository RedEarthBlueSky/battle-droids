const express = require('express');
const app = express();
const serv = require('http').Server(app);
const config = require('./config.json');

app.get('/', function (req ,res) {
  res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/client/404.html');
});

serv.listen(config.port, function () {
  console.log(`Server running on http://${config.hostname}:${config.port}`);
});
