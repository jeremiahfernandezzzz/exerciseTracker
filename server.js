// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://jopet:jopet@ds131546.mlab.com:31546/clementinejs2';

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post('/api/exercise/new-user', function(request, response) {
  // response.send(request.body);
      MongoClient.connect(url, function(err, client){
      if (client){
        var db = client.db('clementinejs2');
        db.collection("exercises").insertOne({username: request.body.username, exercises: []});
        // response.end(JSON.stringify(db));
      }
      if (err) {
        response.end("did not connect to " + url)
      }
    })
});

app.post('/api/exercise/add', function(request, response) {
  // response.send(request.body);
      MongoClient.connect(url, function(err, client){
      if (client){
        var db = client.db('clementinejs2');
        db.collection("exercises").update({"_id": ObjectId(request.body.userId)}, {$push: {exercises: {description: request.body.description, duration: request.body.duration, date: request.body.date}}});
        // db.collection("exercises").insertOne({userId: request.body.userId, description: request.body.description, duration: request.body.duration, date: request.body.date});
        // response.end(JSON.stringify(db));
      }
      if (err) {
        response.end("did not connect to " + url)
      }
    })
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});