"use strict";
var filter, oauth_error, parse, search, v;

v = require('valentine');

filter = require('./filter');

search = require('./search');

oauth_error = "You must specify oauth tokens, for example:\noauth = {\n  consumer_key: ''\n  consumer_secret: ''\n  token: ''\n  token_secret: ''\n}";

parse = function(words, oauth) {
  if (!words || words.length < 1) {
    throw new Error('Set words for search');
  }
  if (!(oauth.consumer_key && oauth.consumer_secret && oauth.token && oauth.token_secret)) {
    throw new Error(oauth_error);
  }
  return {
    words: words,
    oauth: oauth
  };
};

module.exports = function(words, oauth, options) {
  if (oauth == null) {
    oauth = {};
  }
  if (options == null) {
    options = {};
  }
  options = parse(words, oauth);
  return {
    validate: require('./validate'),
    blockUsers: require('./validate_block_users'),
    blockWords: require('./validate_block_words'),
    allowLangs: require('./validate_allow_langs'),
    noRetweets: require('./validate_no_retweets'),
    noMentions: require('./validate_no_mentions'),
    noDefaults: require('./validate_no_defaults'),
    maxHashtags: require('./validate_max_hashtags'),
    beautify: require('./beautify'),
    autoLink: require('./beautify_auto_link'),
    expandEntities: require('./beautify_expand_entities'),
    humanDate: require('./beautify_human_date'),
    twtcstFormat: require('./beautify_twtcst_format'),
    filter: filter(options),
    search: search(options)
  };
};
