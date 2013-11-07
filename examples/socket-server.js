"use strict";

var oauth = require('./oauth'),
options = require('./options'),
twtcst  = require('./../lib/index'),

twitter = twtcst(['#js', '#nodejs'], oauth, options),

clients = [],
io = require('socket.io').listen(3065, { "origins": '*:*'});

function message (data) {
  for (var i = 0, client = clients[i]; i < clients.length; i++) {
    if (client.disconnected === false) {
      client.emit('tweet', JSON.stringify(data));
    }
  }
}

io.set('transports', ['websocket', 'xhr-polling']);

io.sockets.on('connection', function(socket) {
  clients.push(socket);
  socket.on('search', function () {
    twitter.search(function (error, tweets) {
      if (tweets) {
        for (var i = 0; i < tweets.length; i++) {
          message(tweets[i]);
        }
      }
    });
  });
});


twitter.filter(function(error, tweet) {
  if (error) {
    console.log(error);
  } else {
    message(tweet);
  }
});

