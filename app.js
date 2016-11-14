const express = require('express');
const app = express();
const serv = require('http').Server(app);  // serves files from http
const config = require('./config.json');

app.get('/',function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.use('/client',express.static(__dirname + '/client'));

app.get('*',function(req, res) {
    res.sendFile(__dirname + '/client/404.html');
});

serv.listen(config.port, function () {
  console.log(`Server running on http://${config.hostname}:${config.port}`);
});

let SOCKET_LIST = {};

let io = require('socket.io')(serv,{});
io.sockets.on('connection', function (socket) {
  socket.id = Math.random();
  socket.x = 0;
  socket.y = 0;
  socket.number = "" + Math.floor(10 * Math.random());
  SOCKET_LIST[socket.id] = socket;

  socket.on('disconnect', function () {
    delete SOCKET_LIST[socket.id];
  });
});

setInterval (function () {
  var pack = [];
  for (var i in SOCKET_LIST) {
    let socket = SOCKET_LIST[i];
    socket.x++;
    socket.y++;
    pack.push({
      x: socket.x,
      y: socket.y,
      number: socket.number
    });
  }
  for (var i in SOCKET_LIST) {
    let socket = SOCKET_LIST[i];
    socket.emit('newPosition', pack);
  }
}, 1000/45);
