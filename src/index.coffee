"use strict"

v = require 'valentine'

filter   = require './filter'
search   = require './search'

defaults =
  version: 1.1           # Twitter API version

  count: false           # count tweets
  storage: false         # file where save the counter

  media:                 # settings for images
    width: 500           # max width of images in tweets
    height: 500          # max height of images in tweets
    class: 'tweet_image' # class will be added to links around images

oauth_error = """You must specify oauth tokens, for example:
oauth = {
  consumer_key: ''
  consumer_secret: ''
  token: ''
  token_secret: ''
}
"""

parse = (words, oauth, params) ->
  if not words or words.length < 1
    throw new Error 'Set words for search'

  unless oauth.consumer_key and oauth.consumer_secret and oauth.token and oauth.token_secret
    throw new Error oauth_error

  options = v.extend {}, defaults
  options = v.extend options, params

  options.words = words
  options.oauth = oauth

  options

module.exports = (words, oauth = {}, options = {}) ->
  options = parse words, oauth, options

  if options.count is true
    counter = require('./counter') options.storage
  else
    counter = null

  validate:   require './validate'
  blockUsers: require './validate_block_users'
  blockWords: require './validate_block_words'
  allowLangs: require './validate_allow_langs'
  noRetweets: require './validate_no_retweets'
  noMentions: require './validate_no_mentions'
  noDefaults: require './validate_no_defaults'
  maxHashlen: require './validate_max_hashlen'

  beautify:       require './beautify'
  autoLink:       require './beautify_auto_link'
  expandEntities: require './beautify_expand_entities'
  humanDate:      require './beautify_human_date'
  twtcstFormat:   require './beautify_twtcst_format'

  filter: filter options, counter
  search: search options, counter
