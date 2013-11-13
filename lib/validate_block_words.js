module.exports = function(word_list) {
  return function(tweet) {
    var entity, text, word, _i, _j, _len, _len1, _ref;
    text = tweet.text;
    if (tweet.entities && (tweet.entities.urls != null) && tweet.entities.urls.length > 0) {
      _ref = tweet.entities.urls;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entity = _ref[_i];
        text = text.replace(entity.url, entity.expanded_url);
      }
    }
    text = text.toLowerCase();
    for (_j = 0, _len1 = word_list.length; _j < _len1; _j++) {
      word = word_list[_j];
      if (text.indexOf(word) !== -1) {
        return false;
      }
    }
    return true;
  };
};
