"use strict";

var twtcst = require('./../lib/index'),

oauth = require('./stuff/oauth'),
options = require('./stuff/options'),

twitter = twtcst(['#js', '#nodejs'], oauth, options),

clients = [],

io = require('socket.io').listen(8080);

function message(data) {
  for (var i = 0, client = clients[i]; i < clients.length; i++) {
    if (client.disconnected === false) {
      client.emit('tweet', JSON.stringify(data));
    }
  }
}

io.sockets.on('connection', function(socket) {
  clients.push(socket);

  socket.on('search', function() {
    twitter.search(function(error, tweets) {
      if (tweets) {
        for (var i = 0, length = tweets.length; i < length; i++) {
          message(tweets[i]);
        }
      }
    });
  });
});

twitter.filter(function(error, tweet) {
  if (tweet) {
    message(tweet);
  }
});