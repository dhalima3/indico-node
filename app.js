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
var indico = require('indico.io');
var secrets = require('./config/secrets.js');
indico.apiKey = secrets.indigoApiKey;
console.log(indico.apiKey);

// [START hello_world]
// Say hello!
app.get('/', function(req, res) {
  res.status(200).send('Hello, world!');
});
// [END hello_world]

app.get('/indico-sentiment', function(req, res) {
  var result = "";
  indico.sentiment("This is a decent example")
    .then(function(score) {
        res.status(200).sendStatus(score);
    }).catch(function(err) {
      console.warn(err);
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
