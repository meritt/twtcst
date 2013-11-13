twitter = require 'twitter-text'

module.exports = (n) ->
  n = parseInt n, 10
  (tweet) ->
    hashtags = twitter.extractHashtagsWithIndices tweet.text
    if hashtags and hashtags.length > n
      return false
    return true
