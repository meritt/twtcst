module.exports = function() {
  return function(tweet) {
    var text;
    text = tweet.text;
    if (text.indexOf('@') === 0 || text.indexOf('.@') === 0) {
      return false;
    }
    return true;
  };
};
