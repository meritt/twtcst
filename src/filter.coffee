
params = (options) ->
  return {
    url: "https://stream.twitter.com/#{options.version}/statuses/filter.json"
    oauth: options.oauth
    form: include_entities: true
  }

module.exports = (options, beautify, validate) ->
  params = params options
  return (fn) ->
    params.form.track = options.words.join ','

    request = require('request').post params, (error, response, body) ->
      fn error, false if error

    request.on 'data', (buffer) ->
      try
        tweet = JSON.parse buffer.toString()
      catch error
        tweet = false

      if validate tweet
        tweet = beautify tweet, false

        fn null, tweet
