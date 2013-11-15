params = (options) ->
  url: "https://stream.twitter.com/1.1/statuses/filter.json"
  oauth: options.oauth
  form:
    include_entities: true
    track: options.words.join ','

request = require 'request'

makeRequest = (validate, beautify, fn) ->
  stream = request.post params, (error, response, body) ->
    fn error, false if error

  stream.on 'end', ->
    makeRequest validate, beautify, fn
    return

  stream.on 'data', (buffer) ->
    try
      tweet = JSON.parse buffer.toString()
      if tweet and tweet.disconnect
        console.log "Disconnected from twitter stream: #{disconnect.reason}"
        makeRequest validate, beautify, fn
        return
    catch error
      console.log "Error from twitter stream try/catch #{error.message}"
      tweet = false

    if tweet and validate tweet
      tweet = beautify tweet, false if beautify

      fn null, tweet
      return
  return

module.exports = (options) ->
  params = params options

  (validate, beautify, fn) ->
    makeRequest validate, beautify, fn
    return
