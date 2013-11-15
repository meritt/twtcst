params = (options) ->
  url: "https://stream.twitter.com/1.1/statuses/filter.json"
  oauth: options.oauth
  form:
    include_entities: true
    track: options.words.join ','

request = require 'request'

makeRequest = (validate, beautify, fn) ->
  req = request.post params, (error, response, body) ->
    fn error, false if error

  req.on 'end', () ->
    req = makeRequest validate, beautify, fn

  req.on 'data', (buffer) ->
    try
      tweet = JSON.parse buffer.toString()
      if tweet.disconnect
        req = makeRequest validate, beautify, fn
    catch error
      tweet = false

    if tweet and validate tweet
      tweet = beautify tweet, false if beautify

      fn null, tweet

  req


module.exports = (options) ->
  params = params options

  (validate, beautify, fn) ->
    req = makeRequest validate, beautify, fn
