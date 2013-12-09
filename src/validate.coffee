module.exports = (fns) ->
  return (tweet) ->
    return false if not tweet or not tweet.user or not tweet.text

    for fn in fns when not fn tweet
      return false

    return true