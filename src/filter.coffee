params = (options) ->
  url: "https://stream.twitter.com/1.1/statuses/filter.json"
  oauth: options.oauth
  form:
    include_entities: true
    track: options.words.join ','

module.exports = (options) ->
  params = params options

  (validate, beautify, fn) ->
    request = require('request').post params, (error, response, body) ->
      fn error, false if error

    request.on 'data', (buffer) ->
      try
        tweet = JSON.parse buffer.toString()
      catch error
        tweet = false

      if validate tweet
        tweet = beautify tweet, false if beautify

        fn null, tweet
