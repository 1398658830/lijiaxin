var LocalStorage = require('node-localstorage').LocalStorage;
var sessionStorage = require('sessionstorage');
var express = require('express');
var app = express(); 
var bodyParser = require('body-parser');
localStorage = new LocalStorage('./');
app.use(express.static('all'));

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', function (req, res) {
    res.sendFile( __dirname + "/views/" + "login.html" );
})

app.get('/register', function (req, res) {
        res.sendFile( __dirname + "/views/" + "register.html" );
    })
app.get('/login', function (req, res) {
        res.sendFile( __dirname + "/views/" + "login.html" );
    })
app.get('/index', function(req, res) {
         const UserInfoState = sessionStorage.getItem('userState');
         if (UserInfoState) {
            res.sendFile(__dirname + "/views/" + "index.html");
            // res.render('index', {
            //      name: JSON.parse(sessionStorage.getItem('userState')).name
            // });
          } 
        else {
            res.redirect('/login');
         }
    })
    app.get('/logout', function(req, res) {
        sessionStorage.removeItem('userState');
        res.sendFile(__dirname + "/views/" + "login.html");
    })


app.get('/user',function(req,res){
    var username=JSON.parse(sessionStorage.getItem('userState')).name;
    res.send(username);
})
app.post('/register_post', urlencodedParser, function(req, res) {
    res.sendFile(__dirname + "/views/" + "login.html");
})


app.post('/login_post', urlencodedParser, function(req, res) {
    res.sendFile(__dirname + "/views/" + "index.html");
})

 
var server = app.listen(1111, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("访问地址为 http://%s:%s", host, port)
 
})
