filter = require './filter'
search = require './search'

defaults =
  version: "1.1"
  lang: ["en"]
  mute: []
  spam: []
  count: "count.txt"
  hashlength: 5


oauthErr = "You must specify oauth in your options object:\n
oauth: {\n
  consumer_key: ''\n
  consumer_secret: ''\n
  token: ''\n
  token_secret: ''\n
}\n
"

parse = (words, oauth, options) ->
  if not words or words.length < 1
    throw "Set words for search"
  if not (oauth and oauth.consumer_key and oauth.consumer_secret and oauth.token and oauth.token_secret)
    throw oauthErr
  result = JSON.parse JSON.stringify defaults
  for own key, value of options
    result[key] = value
  result.words = words
  result.oauth = oauth
  return result

module.exports = (words, oauth, options) ->
  options = parse words, oauth, options
  return {
    filter: filter options
    search: search options
  }

