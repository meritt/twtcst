twitter = require 'twitter-text'

module.exports = (auto) ->
  return (tweet) ->
    if auto is true
      text = twitter.autoLink tweet.text, target: '_blank'
    else
      text = twitter.autoLinkUrlsCustom tweet.text, target: '_blank'

    tweet.text = text
    tweet