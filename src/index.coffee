filter = require './filter'
search = require './search'

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
  blockUsers: require './validate/block_users'
  blockWords: require './validate/block_words'
  allowLangs: require './validate/allow_langs'
  noRetweets: require './validate/no_retweets'
  noMentions: require './validate/no_mentions'
  noDefaults: require './validate/no_defaults'
  maxHashtags: require './validate/max_hashtags'

  beautify:       require './beautify'
  autoLink:       require './beautify/auto_link'
  expandEntities: require './beautify/expand_entities'
  humanDate:      require './beautify/human_date'
  twtcstFormat:   require './beautify/twtcst_format'

  filter: filter options
  search: search options