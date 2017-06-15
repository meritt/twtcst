const filter = require('./filter');
const search = require('./search');

const oauth_error = `
You must specify oauth tokens, for example:

const oauth = {
  consumer_key: '',
  consumer_secret: '',
  token: '',
  token_secret: '',
};
`;

const parse = function(words, oauth) {
  if (!words || words.length < 1) {
    throw new Error('Set words for search');
  }

  if (!oauth.consumer_key || !oauth.consumer_secret ||
      !oauth.token || !oauth.token_secret) {
    throw new Error(oauth_error);
  }

  return {
    words: words,
    oauth: oauth
  };
};

module.exports = function(words, oauth = {}, options = {}) {
  options = parse(words, oauth);

  return {
    validate: require('./validate'),
    blockUsers: require('./validate/block_users'),
    blockWords: require('./validate/block_words'),
    allowLangs: require('./validate/allow_langs'),
    noRetweets: require('./validate/no_retweets'),
    noMentions: require('./validate/no_mentions'),
    noDefaults: require('./validate/no_defaults'),
    noQuoted: require('./validate/no_quoted'),
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
