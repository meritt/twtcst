twitter = require 'twitter-text'

module.exports = (max) ->
  max = parseInt(max, 10) or 0

  return (tweet) ->
    hashtags = twitter.extractHashtagsWithIndices tweet.text
    if hashtags and hashtags.length > max
      return false

    return true