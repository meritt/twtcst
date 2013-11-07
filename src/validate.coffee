twitter = require 'twitter-text'

module.exports = (options) ->
  return (tweet) ->
    return false if not tweet or not tweet.user or not tweet.text

    # Only determinded languages
    if options.lang and options.lang.length > 0
      if tweet.user.lang?
        return false if tweet.user.lang not in options.lang

    # Remove some twitter accounts
    if options.mute and options.mute.length > 0
      account = "#{tweet.user.screen_name}".toLowerCase()
      return false for spam in options.mute when account is spam

    text = "#{tweet.text}"

    # Retweets
    unless options.retweets
      return false if text.indexOf('RT ') is 0

    # Mentions
    unless options.mentions
      return false if text.indexOf('@') is 0 or text.indexOf('.@') is 0

    # Check user avatar, if it's default then ignore
    if options.userpics
      if tweet.user.profile_image_url.indexOf('default_profile_images') > -1
        return false

    # Prepare tweet text
    if tweet.entities and tweet.entities.urls? and tweet.entities.urls.length > 0
      for entity in tweet.entities.urls
        text = text.replace entity.url, entity.expanded_url

    text = text.toLowerCase()

    # Remove spam tweets
    if options.spam and options.spam.length > 0
      return false for spam in options.spam when text.indexOf(spam) isnt -1

    # Remove tweets with spam hashtags
    if options.hashtags
      hashtags = twitter.extractHashtagsWithIndices text
      if hashtags and hashtags.length > options.hashtags
        return false

    return true