var express = require('express');
var router = express.Router();
const mysql = require('mysql')

const crypto = require('crypto');

var app = require('express')();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

const con = mysql.createConnection({
    host: 'localhost',
    user: 'dy',
    password: '1234',
    database: 'xwork'

})

router.get('/', function (req, res, next) {
    res.render('accueil/index', { title: '<|> | Accueil', error: "", logo: "< | >", host: req.hostname });
});

module.exports = router;