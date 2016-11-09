const express = require('express');
 // function handler to supply to http server
const app = express();
const router = require('./router');
const config = require('./config.json');

app.use('/', router);

app.listen(config.port, function () {
  console.log(`Server running on http://${config.hostname}:${config.port}`);
});
