var twitter;

twitter = require('twitter-text');

module.exports = function(n) {
  n = parseInt(n, 10);
  return function(tweet) {
    var hashtags;
    hashtags = twitter.extractHashtagsWithIndices(tweet.text);
    if (hashtags && hashtags.length > n) {
      return false;
    }
    return true;
  };
};
