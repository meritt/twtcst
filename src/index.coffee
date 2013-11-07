"use strict"

filter   = require './filter'
search   = require './search'
beautify = require './beautify'
validate = require './validate'

defaults =
  version: 1.1       # Twitter API version
  count: false       # 

  lang: ['en', 'ru'] # list of languages
  mute: []           # list of blocked twitter accounts
  spam: []           # list of blocked keywords in text

  retweets: false    # show old retweets
  mentions: false    # show mentions
  userpics: true     # hide twitter accounts with default userpic
  hashtags: 5        # maximum hashtags in text

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

  options = JSON.parse JSON.stringify defaults

  options[key] = value for own key, value of params

  if options.hashtags
    options.hashtags = parseInt options.hashtags, 10
    options.hashtags = false unless options.hashtags > -1

  options.words = words
  options.oauth = oauth

  options

module.exports = (words, oauth = {}, options = {}) ->
  options = parse words, oauth, options

  if options.count is true
    counter = require('./counter')(options.count_file)
  else
    counter = null

  beautify = beautify options, counter
  validate = validate options

  filter: filter options, beautify, validate
  search: search options, beautify, validate
