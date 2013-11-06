beautify = require './beautify'
validate = require './validate'
counter  = require './counter'

params = (options) ->
  return {
    url: "https://stream.twitter.com/#{options.version}/statuses/filter.json"
    oauth: options.oauth
    form: include_entities: true
  }

pad = (n) -> if n < 10 then "0#{n}" else n

module.exports = (options) ->
  params = params options
  validate = validate options
  beautify = beautify options
  counter = counter options
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

        data =
          id: tweet.id_str
          link: "http://twitter.com/#{tweet.user.screen_name}"
          avatar: tweet.user.profile_image_url
          login: tweet.user.screen_name
          name: tweet.user.name or tweet.user.screen_name
          text: tweet.text
          date: created
          iso: date.toISOString()
          counter: counter.inc()

        fn null, data

