"use strict"

filter = require './filter'
search = require './search'
beautify = require './beautify'
validate = require './validate'


defaults =
  version: 1.1
  retweets: true
  mentions: true
  default_profile_images: true
  count: true
  lang: []
  mute: []
  spam: []
  media:
    width: 500
    height: 500
    class: "twtcst_image"

oauth_error = """You must specify oauth in your options object:
oauth = {
  consumer_key: ''
  consumer_secret: ''
  token: ''
  token_secret: ''
}
"""

parse = (words, oauth, options) ->
  if not words or words.length < 1
    throw new Error "Set words for search"

  unless oauth.consumer_key and oauth.consumer_secret and oauth.token and oauth.token_secret
    throw new Error oauth_error

  result = JSON.parse JSON.stringify defaults

  result[key] = value for own key, value of options

  if result.hash_length
    result.hash_length = parseInt(result.hash_length, 10) || 1

  result.words = words
  result.oauth = oauth

  result

module.exports = (words, oauth = {}, options = {}) ->

  options = parse words, oauth, options

  if options.count
    counter = require('./counter')(options.count_file)
  else
    counter = null

  _beautify = beautify options
  _validate = validate options

  filter: filter options, _beautify, _validate, counter
  search: search options, _beautify, _validate, counter
