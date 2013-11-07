"use strict"

v = require 'valentine'

filter   = require './filter'
search   = require './search'
beautify = require './beautify'
validate = require './validate'

defaults =
  version: 1.1           # Twitter API version

  lang: ['en', 'ru']     # list of languages
  mute: []               # list of blocked twitter accounts
  spam: []               # list of blocked keywords in text

  retweets: false        # show old retweets
  mentions: false        # show mentions
  userpics: true         # hide twitter accounts with default userpic
  hashtags: 5            # maximum hashtags in text

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

  if options.hashtags
    options.hashtags = parseInt options.hashtags, 10
    options.hashtags = false unless options.hashtags > -1

  options.words = words
  options.oauth = oauth

  options

module.exports = (words, oauth = {}, options = {}) ->
  options = parse words, oauth, options

  if options.count is true
    counter = require('./counter') options.storage
  else
    counter = null

  _beautify = beautify options
  _validate = validate options

  filter: filter options, _beautify, _validate, counter
  search: search options, _beautify, _validate, counter
