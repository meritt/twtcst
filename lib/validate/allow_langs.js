var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

module.exports = function(lang) {
  return function(tweet) {
    var _ref;
    if (tweet.user.lang != null) {
      if (_ref = tweet.user.lang, __indexOf.call(lang, _ref) < 0) {
        return false;
      }
    }
    return true;
  };
};
