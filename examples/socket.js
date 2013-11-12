"use strict";

var twtcst = require('./../lib/index'),

oauth = require('./stuff/oauth'),
options = require('./stuff/options'),

twitter = twtcst(['#js', '#nodejs'], oauth, options),

validate = twitter.validate([
  twitter.allowLangs(['en', 'ru']),
  twitter.blockUsers(['simonenko', 'isquariel']),
  twitter.blockWords(['test', 'word', 'array', '#php']),
  twitter.noRetweets(),
  twitter.noMentions(),
  twitter.noDefaults(),
  twitter.maxHashlen(5)
]),

beautify = twitter.beautify([
  twitter.autoLink(false),
  twitter.expandEntities({
    "urls": true,
    "media": {
      "width": 500,
      "height": 500,
      "class": 'tweet_image'
    }
  }),
  twitter.humanDate(),
  twitter.twtcstFormat()
]),

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
    twitter.search(validate, beautify, function(error, tweets) {
      if (tweets) {
        for (var i = 0, length = tweets.length; i < length; i++) {
          message(tweets[i]);
        }
      }
    });
  });
});

twitter.filter(validate, beautify, function(error, tweet) {
  if (error) {
    console.log(error);
  }
  if (tweet) {
    message(tweet);
  }
});
