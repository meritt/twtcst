const twitter = require('twitter-text');

module.exports = function (auto) {
  return function (tweet) {
    if (auto === true) {
      tweet.text = twitter.autoLink(tweet.text, {
        target: '_blank'
      });
    } else {
      tweet.text = twitter.autoLinkUrlsCustom(tweet.text, {
        target: '_blank'
      });
    }

    return tweet;
  };
};
