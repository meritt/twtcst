v = require 'valentine'

filter   = require './filter'
search   = require './search'

oauth_error = """You must specify oauth tokens, for example:
oauth = {
  consumer_key: ''
  consumer_secret: ''
  token: ''
  token_secret: ''
}
"""

parse = (words, oauth) ->
  if not words or words.length < 1
    throw new Error 'Set words for search'

  unless oauth.consumer_key and oauth.consumer_secret and oauth.token and oauth.token_secret
    throw new Error oauth_error

  words: words
  oauth: oauth

module.exports = (words, oauth = {}, options = {}) ->

  options = parse words, oauth

  validate:   require './validate'
  blockUsers: require './validate_block_users'
  blockWords: require './validate_block_words'
  allowLangs: require './validate_allow_langs'
  noRetweets: require './validate_no_retweets'
  noMentions: require './validate_no_mentions'
  noDefaults: require './validate_no_defaults'
  maxHashtags: require './validate_max_hashtags'

  beautify:       require './beautify'
  autoLink:       require './beautify_auto_link'
  expandEntities: require './beautify_expand_entities'
  humanDate:      require './beautify_human_date'
  twtcstFormat:   require './beautify_twtcst_format'

  filter: filter options
  search: search options
