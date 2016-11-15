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
    facingX:0,
    facingY:0,
    movingX:0,
    movingY:0,
    width:30,  // drawn element width
    height:30, // drawn element height
    map:{},
    thrust:.06,
    rotationalVelocity:5, //how many degrees to turn the ship
    radians:0,
  }

  self.keyPress = () => {
     if (self.map[38] == true) {
       self.radians = self.rotate * Math.PI/180;
       self.facingX = Math.cos(self.radians);
       self.facingY = Math.sin(self.radians);
       self.movingX = self.movingX + self.thrust*self.facingX;
       self.movingY = self.movingY + self.thrust*self.facingY;
     }

     if (self.map[37] == true) {
       //  decrementAngle
       self.rotate -= self.rotationalVelocity;
     }

     if (self.map[39] == true) {
        // incrementAngle
       self.rotate += self.rotationalVelocity;
     }

     self.x = self.x + self.movingX;
     self.y = self.y + self.movingY;
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

  socket.on('keyPressed', function (data) {
    player.map[data.keyCode] = data.state;
  });
});

//  create game loop
const FRAMES_PER_SECOND = 45;
let frameTime = 1000/FRAMES_PER_SECOND;
setInterval(function () {
  let pack = [];  //  package to update all players
  for (var i in PLAYER_LIST) {
    var player = PLAYER_LIST[i];
    player.keyPress();
    pack.push({
      x:player.x,
      y:player.y,
      rotate:player.rotate,
    });
    //  loop through the sockets and emit the pack for each socket
    //  broadcast fixes issue with not update but also makes very buggy
    let socket = SOCKET_LIST[i];
    socket.broadcast.emit('newPosition', pack);
  }
}, frameTime );
