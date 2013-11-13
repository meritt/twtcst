qs = require 'querystring'

params = (options) ->
  data =
    result_type: 'recent'
    count: 60
    q: options.words.join ' OR '

  url: "https://api.twitter.com/1.1/search/tweets.json?#{qs.stringify data}"
  oauth: options.oauth
  json: true

module.exports = (options) ->
  count = 10
  params = params options

  (validate, beautify, fn) ->
    require('request').get params, (error, response, body) ->
      if error
        return fn error, false

      if response.statusCode isnt 200
        return fn "Response code isnt 200 (#{response.statusCode})", false

      tweets = body.statuses or []
      results = []
      while results.length isnt count and tweets.length > 0
        try
          tweet = tweets.shift()
        catch error
          tweet = false

        break unless tweet

        if validate tweet
          tweet = beautify tweet if beautify
          results.push tweet

      fn null, results
