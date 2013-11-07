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

  media:
    width: 500
    height: 500
    class: 'twtcst_image'


oauth_error = """You must specify oauth tokens, for example:
oauth = {
  consumer_key: ''
  consumer_secret: ''
  token: ''
  token_secret: ''
}
"""


merge = (obj1, obj2) ->
  for own key, value of obj2
    try
      if value.constructor is Object
        obj1[key] = merge obj1[key], value
      else
        obj1[key] = value
    catch e
      obj1[key] = value
  return obj1


parse = (words, oauth, params) ->
  if not words or words.length < 1
    throw new Error 'Set words for search'

  unless oauth.consumer_key and oauth.consumer_secret and oauth.token and oauth.token_secret
    throw new Error oauth_error

  options = JSON.parse JSON.stringify defaults

  options = merge options, params

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

  _beautify = beautify options
  _validate = validate options

  filter: filter options, _beautify, _validate, counter
  search: search options, _beautify, _validate, counter
