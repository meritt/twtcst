"use strict"

filter = require './filter'
search = require './search'

defaults =
  version: "1.1"
  lang: ["en", "ru"]
  mute: []
  spam: []
  count: "count.txt"
  hashlength: 5

oauthError = """You must specify oauth in your options object:
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
    throw new Error oauthError

  result = JSON.parse JSON.stringify defaults

  result[key] = value for own key, value of options

  result.words = words
  result.oauth = oauth

  result

module.exports = (words, oauth = {}, options = {}) ->
  options = parse words, oauth, options

  filter: filter options
  search: search options