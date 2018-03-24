var express = require('express');
var router = express.Router();
var session = require("express-session");

router.use(session({
  secret: '1234',
  resave: false,
  saveUninitialized: true
}));

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.views) {
    req.session.views++;
  } else {
    req.session.views = 1;
  }
  console.log(req.session.views);
  res.render('index', { title: 'Express' });
});

module.exports = router;
