module.exports = ->
  return (tweet) ->
    return false if tweet.text.indexOf('RT ') is 0
    return true