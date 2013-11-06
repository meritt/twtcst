filter = require './filter'
search = require './search'

defaults =
  version: "1.1"
  lang: ["en"]
  mute: []
  spam: []
  count: "count.txt"


oauthErr = "You must specify oauth in your options object:\n
oauth: {\n
  consumer_key: ''\n
  consumer_secret: ''\n
  token: ''\n
  token_secret: ''\n
}\n
"

parse = (options) ->
  if not options.words or options.words.length < 1
    throw "Set words for search"
  if not (options.oauth and options.oauth.consumer_key and options.oauth.consumer_secret and options.oauth.token and options.oauth.token_secret)
    throw oauthErr
  for own key, value of defaults
    if not options.hasOwnProperty key
      options[key] = value
  return options

module.exports = (options) ->
  options = parse options
  return {
    filter: filter options
    search: search options
  }

