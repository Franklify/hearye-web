var express = require('express'),
app = express(),
http = require('http').createServer(app),
path = require('path');

port = process.env.port || 3000;

app.use(express.static(path.join(__dirname, 'public')));

//get request for index
app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

http.listen(port, function(){
  console.log('listening on port :3000');
});