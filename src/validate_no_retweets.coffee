module.exports = ->
  (tweet) ->
    return false if tweet.text.indexOf('RT ') is 0
    true
