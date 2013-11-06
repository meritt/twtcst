request = require 'request'
qs      = require 'querystring'

beautify = require './beautify'
validate = require './validate'

data =
  lang: 'ru'
  result_type: 'recent'
  count: 60

pad = (n) -> if n < 10 then "0#{n}" else n

module.exports = (options) ->
  validate = validate options
  beautify = beautify options
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

        tweet = beautify tweet, false

        date = new Date tweet.created_at
        created = date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) + ' ' + pad(date.getHours()) + ':' + pad(date.getMinutes())

        if tweet.media isnt false
          media = tweet.media

          if media.h > 150
            media.w = media.w * 150 / media.h
            media.h = 150

          if media.w > 500
            media.h = media.h * 500 / media.w
            media.w = 500

          image = "<a href=\"#{media.url}\" class=\"tw-image\" target=\"_blank\">"
          image += "<img src=\"#{media.url}\" width=\"#{media.w}\" height=\"#{media.h}\">"
          image += "</a>"

          tweet.text += image

        results.push
          id: tweet.id_str
          link: "http://twitter.com/#{tweet.user.screen_name}"
          avatar: tweet.user.profile_image_url
          login: tweet.user.screen_name
          name: tweet.user.name or tweet.user.screen_name
          text: tweet.text
          date: created
          iso: date.toISOString()

      fn results

