const router = require('express').Router();

router.get('/', function (req, res) {
  res.sendFile(__dirname +'/client/index.html');
});

//  for anyting else send error page
router.get('*', function (req, res) {
  res.sendFile(__dirname + '/client/404.html');
});

module.exports = router;
