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

console.log('Twitter stream fetching...');
twitter.filter(validate, beautify, function(error, tweet) {
  if (error) {
    console.log(error);
  }

  if (tweet) {
    console.log(tweet);
  }
});
