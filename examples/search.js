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
  twitter.maxHashtags(5)
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
]);

twitter.search(validate, beautify, function(error, tweets) {
  console.log(tweets);

  twitter.filter(validate, beautify, function(error, tweet) {
    if (tweet) {
      console.log(tweet);
    }
  });
});
