module.exports = function() {
  return function(tweet) {
    if (tweet.text.indexOf('RT ') === 0) {
      return false;
    }
    return true;
  };
};
