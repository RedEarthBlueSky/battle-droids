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
let PLAYER_LIST = {};

let Player = (id) => {
  var self = {
    x:50,
    y:50,
    rotate:0,
    id:id,
  }
  return self;
};

const io = require('socket.io')(serv, {});
io.sockets.on('connection', function(socket){
  console.log('socket connection');
  socket.id = Math.random();
  SOCKET_LIST[socket.id] = socket;

  let player = Player(socket.id);
  PLAYER_LIST[socket.id] = player;

  socket.on('disconnect', function () {
    delete SOCKET_LIST[socket.id];
    delete PLAYER_LIST[socket.id];
  });
});

//  create game loop
const FRAMES_PER_SECOND = 45;
let frameTime = 1000/FRAMES_PER_SECOND;
setInterval(function () {
  let pack = [];  //  package to update all players
  for (var i in PLAYER_LIST) {
    var player = PLAYER_LIST[i];
    player.x++;
    player.y++;
    player.rotate++;
    pack.push({
      x:player.x,
      y:player.y,
      rotate:player.rotate
    });
    //  loop through the sockets and emit the pack for each socket
    //  broadcast fixes issue with not update but also makes very buggy
    let socket = SOCKET_LIST[i];
    socket.broadcast.emit('newPosition', pack);
  }
}, frameTime );
