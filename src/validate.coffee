twitter = require 'twitter-text'

module.exports = (options) ->
  return (tweet) ->
    return false if not tweet or not tweet.user or not tweet.text

    # Only determinded languages
    if tweet.user.lang?
      return false if tweet.user.lang not in options.lang

    # Remove some twitter accounts
    account = "#{tweet.user.screen_name}".toLowerCase()
    return false for spam in options.mute when account is spam

    text = "#{tweet.text}"

    # Don't allow old retweet or mention tweets
    if text.indexOf('RT ') is 0 or text.indexOf('@') is 0 or text.indexOf('.@') is 0
      return false

    # Check user avatar, if it's default then ignore
    if tweet.user.profile_image_url.indexOf('default_profile_images') > -1
      return false

    # Prepare tweet text
    if tweet.entities.urls? and tweet.entities.urls.length > 0
      for entity in tweet.entities.urls
        text = text.replace entity.url, entity.expanded_url

    text = text.toLowerCase()

    # Remove spam tweets
    return false for spam in options.spam when text.indexOf(spam) isnt -1

    # Remove tweets with spam hashtags
    hashtags = twitter.extractHashtagsWithIndices text
    if hashtags and hashtags.length > 5
      return false

    return true

