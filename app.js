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
  socket.rotate = 0;
  SOCKET_LIST[socket.id] = socket;

  //  if leaver server disconnect session.  Also works
  //  on page refresh...
  socket.on('disconnect', function () {
    delete SOCKET_LIST[socket.id];
  });
});

//  create game loop
const FRAMES_PER_SECOND = 45;
let frameTime = 1000/FRAMES_PER_SECOND;
setInterval(function () {
  let pack = [];  //  package to update all players
  for (var i in SOCKET_LIST) {
    var socket = SOCKET_LIST[i];
    socket.x++;
    socket.y++;
    socket.rotate++;
    pack.push({
      x:socket.x,
      y:socket.y,
      rotate:socket.rotate
    });
    //  broadcast fixes issue with not update but also makes very buggy
    socket.broadcast.emit('newPosition', pack);
  }
}, frameTime );
