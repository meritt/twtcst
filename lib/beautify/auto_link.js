var twitter;

twitter = require('twitter-text');

module.exports = function(auto) {
  return function(tweet) {
    var text;
    if (auto === true) {
      text = twitter.autoLink(tweet.text, {
        target: '_blank'
      });
    } else {
      text = twitter.autoLinkUrlsCustom(tweet.text, {
        target: '_blank'
      });
    }
    tweet.text = text;
    return tweet;
  };
};
