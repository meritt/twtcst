var twitter,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

twitter = require('twitter-text');

module.exports = function(options) {
  return function(tweet) {
    var account, entity, hashtags, spam, text, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3;
    if (!tweet || !tweet.user || !tweet.text) {
      return false;
    }
    if (options.lang && options.lang.length > 0) {
      if (tweet.user.lang != null) {
        if (_ref = tweet.user.lang, __indexOf.call(options.lang, _ref) < 0) {
          return false;
        }
      }
    }
    if (options.mute && options.mute.length > 0) {
      account = ("" + tweet.user.screen_name).toLowerCase();
      _ref1 = options.mute;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        spam = _ref1[_i];
        if (account === spam) {
          return false;
        }
      }
    }
    text = "" + tweet.text;
    if (!options.retweets) {
      if (text.indexOf('RT ') === 0) {
        return false;
      }
    }
    if (!options.mentions) {
      if (text.indexOf('@') === 0 || text.indexOf('.@') === 0) {
        return false;
      }
    }
    if (options.userpics) {
      if (tweet.user.profile_image_url.indexOf('default_profile_images') > -1) {
        return false;
      }
    }
    if (tweet.entities && (tweet.entities.urls != null) && tweet.entities.urls.length > 0) {
      _ref2 = tweet.entities.urls;
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        entity = _ref2[_j];
        text = text.replace(entity.url, entity.expanded_url);
      }
    }
    text = text.toLowerCase();
    if (options.spam && options.spam.length > 0) {
      _ref3 = options.spam;
      for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
        spam = _ref3[_k];
        if (text.indexOf(spam) !== -1) {
          return false;
        }
      }
    }
    if (options.hashtags) {
      hashtags = twitter.extractHashtagsWithIndices(text);
      if (hashtags && hashtags.length > options.hashtags) {
        return false;
      }
    }
    return true;
  };
};
