// require dependencies
var express = require('express'),
app = express(),
path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

//get request for index
app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});
app.get('/how-it-works', function(req, res) {
  res.sendFile(__dirname + '/views/about.html');
});
app.get('/team', function(req, res) {
  res.sendFile(__dirname + '/views/team.html');
});
app.get('/blog', function(req, res) {
  res.sendFile(__dirname + '/views/blog.html');
});

//404 status handling
app.use(function(request, response, next) {
  response.status(404);
  response.sendFile(path.join(__dirname + '/views/404.html'));
});

//Handle errors
app.use(function(err, request, response, next) {
  console.error('An application error has occurred:');
  console.error(err.stack);
  response.status(500);
  response.sendFile(path.join(__dirname + '/views/500.html'));
});

// start default server
app.listen(process.env.PORT || 1337, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
