// Copyright 2015, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

var express = require('express');

var app = express();
var fs = require('fs');
var util = require('util');
var indico = require('indico.io');
var secrets = require('./config/secrets.js');
var Twit = require('twit');
indico.apiKey = secrets.indigoApiKey;
var T = new Twit({
    consumer_key:         '...'
  , consumer_secret:      '...'
  , access_token:         '...'
  , access_token_secret:  '...'
});

// [START hello_world]
// Say hello!
app.get('/', function(req, res) {
  res.status(200).send('Sup. This is the home page.');
});
// [END hello_world]

app.get('/indico-sentiment', function(req, res) {
  indico.sentiment(req.query.text)
    .then(function(score) {
        res.send(score);
    }).catch(function(err) {
      console.warn(err);
    });
});

app.get('/indico-political', function(req, res) {
  indico.political(req.query.text)
    .then(function(result) {
        res.send(JSON.stringify(result));
    }).catch(function(err) {
      console.warn(err);
    });
});

//DOESN'T WORK
var politicianTwitters = ['LincolnChafee', 'HillaryClinton', 'lessig', 'MartinOMalley', 'BernieSanders', 'JimWebbUSA', 'JebBush', 'RealBenCarson', 'ChrisChristie', 'tedcruz', 'CarlyFiorina', 'gov_gilmore', 'GrahamBlog', 'GovMikeHuckabee', 'BobbyJindal', 'JohnKasich', 'GovernorPataki', 'RandPaul', 'marcorubio', 'RickSantorum', 'ScottWalker', 'realDonaldTrump']
politicianTwitters.forEach(function(name) {
  var log_file = fs.createWriteStream(__dirname + name + '.log', {flags : 'w'});
  var log_stdout = process.stdout;
  console.log = function(d) { //
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
  };

  T.get('statuses/user_timeline', {screen_name: name, count: 200}, function(err, data, response) {
    console.log(data);
  });
});

// [START server]
// Start the server
var server = app.listen(process.env.PORT || 8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
// [END server]
