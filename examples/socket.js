const twtcst = require('./../lib/index');
const oauth  = require('./stuff/oauth');

const twitter = twtcst(['js', 'nodejs'], oauth);

const validate = twitter.validate([
  twitter.allowLangs(['en', 'ru']),
  twitter.blockUsers(['simonenko', 'isquariel']),
  twitter.blockWords(['test', 'word', 'array', '#php']),
  twitter.noRetweets(),
  twitter.noMentions(),
  twitter.noDefaults(),
  twitter.noQuoted(),
  twitter.maxHashtags(5)
]);

const beautify = twitter.beautify([
  twitter.autoLink(false),
  twitter.expandEntities({
    'urls': true,
    'media': {
      'width': 500,
      'height': 500,
      'class': 'tweet_image'
    }
  }),
  twitter.humanDate(),
  twitter.twtcstFormat()
]);

const clients = {};

const io = require('socket.io')();
io.listen(8080);

function message(data) {
  for (let key in clients) {
    let client = clients[key];

    if (client && client.disconnected === false) {
      try {
        client.emit('message', JSON.stringify(data));
      } catch (err) {}
    }
  }
}

io.on('connection', function(socket) {
  clients[socket.id] = socket;

  socket.on('disconnect', function() {
    // bad construct
    delete clients[socket.id];
  });

  socket.on('search', function() {
    twitter.search(validate, beautify, function(error, tweets) {
      if (tweets && tweets.length > 0) {
        tweets.map((tweet) => message(tweet));
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
