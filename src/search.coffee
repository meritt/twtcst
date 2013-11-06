request = require 'request'
qs      = require 'querystring'

data =
  result_type: 'recent'
  count: 60

module.exports = (options, beautify, validate) ->
  return (fn) ->
    count = 10
    search = options.words.join ' OR '
    data.q = search
    params =
      url: "https://api.twitter.com/#{options.version}/search/tweets.json?#{qs.stringify data}"
      oauth: options.oauth
      json: true

    request.get params, (error, response, body) ->
      if error or response.statusCode isnt 200
        console.log "Error fetching tweets from #{params.url}: #{error}" if error
        return fn null

      tweets = body.statuses
      results = []
      while results.length isnt count
        try
          tweet = tweets.shift()
        catch error
          tweet = false

        break unless tweet

        continue if validate(tweet) is false

        results.push beautify tweet, false

      fn results

