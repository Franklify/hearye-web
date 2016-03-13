// require dependencies
var express = require('express'),
app = express(),
path = require('path');
var nodemailer = require('nodemailer');
var favicon = require('serve-favicon');
var routes = require('routes');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var homeController = require('./controllers/home');
var aboutController = require('./controllers/about');
var teamController = require('./controllers/team');
var contactController = require('./controllers/contact');
var contactHandlingController = require('./controllers/thankyou');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'img/hearye-new-logo.png')));

app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET || "No secret",
  cookie: { maxAge: 60000 }}));
  //Initialize Flash
app.use(flash());



app.get('/', homeController.index);
app.get('/how-it-works', aboutController.about);
app.get('/team', teamController.team);
app.get('/contact', contactController.contact);
app.get('/thankyou', contactHandlingController.thankyou);

app.post('/contact', function (req, res) {
  contactController.sendMail(req, res);
});
//get request for index
// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/views/index.html');
// });
// app.get('/how-it-works', function(req, res) {
//   res.sendFile(__dirname + '/views/about.html');
// });
// app.get('/team', function(req, res) {
//   res.sendFile(__dirname + '/views/team.html');
// });



//404 status handling
app.use(function(request, response, next) {
  response.status(404);
  response.sendFile(path.join(__dirname + '/views/404.html'));
});

//Handle errors
// app.use(function(err, request, response, next) {
//   console.error('An application error has occurred:');
//   console.error(err.stack);
//   response.status(500);
//   response.sendFile(path.join(__dirname + '/views/500.html'));
// });

// start default server
app.listen(process.env.PORT || 1337, function(){
  console.log('Express server listening on port %d in %s mode', this.address().port, app.settings.env);
});
