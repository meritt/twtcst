module.exports = (lang) ->
  return (tweet) ->
    if tweet.user.lang?
      if tweet.user.lang not in lang
        return false

    return true