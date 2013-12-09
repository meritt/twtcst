module.exports = ->
  return (tweet) ->
    text = tweet.text
    return false if text.indexOf('@') is 0 or text.indexOf('.@') is 0
    return true