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

const io = require('socket.io')(serv, {});
io.sockets.on('connection', function(socket){
  console.log('socket connection');
  socket.id = Math.random();
  socket.x = 0;
  socket.y = 0;
  SOCKET_LIST[socket.id] = socket;

  socket.on('happy', function (data) {
    console.log('happy emit from client');
    console.log('Happy because*: ' + data.reason);
  });

  socket.emit('serverMsg', {
    socketId: socket.id,
    x: socket.x,
    y: socket.y,
    players: Object.keys(SOCKET_LIST).length
  });
});

//  create game loop
const FRAMES_PER_SECOND = 40;
let frameTime = 1000/FRAMES_PER_SECOND;
setInterval(function () {
  let pack = [];  //  package to update all players
  for (var i in SOCKET_LIST) {
    var socket = SOCKET_LIST[i];
    socket.x++;
    socket.y++;
    pack.push({
      x:socket.x,
      y:socket.y
    })
  }
  for (var i in SOCKET_LIST) {
    var socket = SOCKET_LIST[i];
    socket.emit('newPosition', pack);
  }
}, frameTime );
