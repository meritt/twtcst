var twitter;

twitter = require('twitter-text');

module.exports = function(max) {
  max = parseInt(max, 10) || 0;
  return function(tweet) {
    var hashtags;
    hashtags = twitter.extractHashtagsWithIndices(tweet.text);
    if (hashtags && hashtags.length > max) {
      return false;
    }
    return true;
  };
};
