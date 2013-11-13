var twitter;

twitter = require('twitter-text');

module.exports = function(fns) {
  return function(tweet) {
    var fn, _i, _len;
    if (!tweet || !tweet.user || !tweet.text) {
      return false;
    }
    for (_i = 0, _len = fns.length; _i < _len; _i++) {
      fn = fns[_i];
      if (!fn(tweet)) {
        return false;
      }
    }
    return true;
  };
};
