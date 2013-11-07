params = (options) ->
  url: "https://stream.twitter.com/#{options.version}/statuses/filter.json"
  oauth: options.oauth
  form:
    include_entities: true
    track: options.words.join ','

module.exports = (options, beautify, validate, counter) ->
  params = params options

  return (fn) ->
    request = require('request').post params, (error, response, body) ->
      fn error, false if error

    request.on 'data', (buffer) ->
      try
        tweet = JSON.parse buffer.toString()
      catch error
        tweet = false

      if validate tweet
        tweet = beautify tweet, false
        tweet.counter = counter.inc() if counter

        fn null, tweet