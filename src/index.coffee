
filter = require './filter'
search = require './search'

def =
  version: "1.1"
  lang: ["en"]
  words: [
      '#js'
    , '#nodejs'
    , 'nodejs'
    , 'node.js'
  ]
  mute: []
  spam: [
      '"text/javascript"'
    , 'javascript:void(0)'
  ]
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
  if options.oauth
    if options.oauth.consumer_key and options.oauth.consumer_secret
      if options.oauth.token and options.oauth.token_secret
        if not options.version
          options.version = def.version
        if not options.words
          options.words = def.words
        if not options.spam
          options.spam = def.span
        if not options.countfile
          options.count = def.count
        return options
  throw oauthErr

module.exports = (options) ->
  options = parse options
  twtcst =
    filter: filter options
    search: search options
  return twtcst

