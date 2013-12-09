var filter, oauth_error, parse, search;

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
    blockUsers: require('./validate/block_users'),
    blockWords: require('./validate/block_words'),
    allowLangs: require('./validate/allow_langs'),
    noRetweets: require('./validate/no_retweets'),
    noMentions: require('./validate/no_mentions'),
    noDefaults: require('./validate/no_defaults'),
    maxHashtags: require('./validate/max_hashtags'),
    beautify: require('./beautify'),
    autoLink: require('./beautify/auto_link'),
    expandEntities: require('./beautify/expand_entities'),
    humanDate: require('./beautify/human_date'),
    twtcstFormat: require('./beautify/twtcst_format'),
    filter: filter(options),
    search: search(options)
  };
};
