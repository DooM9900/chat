var express = require('express');
var router = express.Router();
var session = require("express-session");
var fs = require('fs');
var path = require('path');

router.use(session({
  secret: '1234',
  resave: false,
  saveUninitialized: true
}));

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.login) {
    fs.readFile(path.join(__dirname, "../public/dialogs/" + req.session.name + ".txt"), function (err, data) {
      if (err) console.log(err);
      var t = data.toString();
      t = t.trim();
      var massiv = t.split("\n");
      res.render('index', { mass: massiv });
    });
  } else {
    req.session.login = false;
    res.redirect('/login');
  }
});

router.get('/logout', function (req, res, next) {
  req.session.login = false;
  res.redirect('/login');
});

router.post('/login', function (req, res, next) {
  console.log(__dirname);
  fs.readFile(path.join(__dirname, "../public/login.txt"), function (err, data) {
    if (err) console.log(err);
    var t = data.toString();
    t = t.trim();
    var massiv = t.split('\n');
    for (var i = 0; i < massiv.length; i++) {
      var login, password;
      [login, password] = massiv[i].split(' ');
      if (login === req.body.login && password === req.body.password) {
        req.session.login = true;
        req.session.name = login;
        res.redirect("/");
        break;
      }
    }
    if (!req.session.login) {
      res.redirect("/login");
    }
  });
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

module.exports = router;
