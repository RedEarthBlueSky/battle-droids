const express = require('express');
 // function handler to supply to http server
const app = express();

app.get('/', function(req, res){
  res.send('Battle droids in space real soon!');
})

const hostname = 'localhost'
const port = 3000;
app.listen(port, function () {
  console.log(`Server running on http://${hostname}:${port}`);
});
