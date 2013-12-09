var twtcst = require('./../lib/index');
var oauth  = require('./stuff/oauth');

var twitter = twtcst(['#js', '#nodejs'], oauth);

var validate = twitter.validate([
  twitter.allowLangs(['en', 'ru']),
  twitter.blockUsers(['simonenko', 'isquariel']),
  twitter.blockWords(['test', 'word', 'array', '#php']),
  twitter.noRetweets(),
  twitter.noMentions(),
  twitter.noDefaults(),
  twitter.maxHashtags(5)
]);

var beautify = twitter.beautify([
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
]);

var clients = {};

var io = require('socket.io').listen(8080);

function message(data) {
  var client, key;

  for (key in clients) {
    client = clients[key];

    if (client && client.disconnected === false) {
      try {
        client.send(JSON.stringify(data));
      } catch (e) {}
    }
  }
}

io.sockets.on('connection', function(socket) {
  clients[socket.id] = socket;

  socket.on('disconnect', function() {
    delete clients[socket.id];
  });

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

console.log('Twitter stream fetching...');
twitter.filter(validate, beautify, function(error, tweet) {
  if (error) {
    console.log(error);
  }

  if (tweet) {
    message(tweet);
  }
});