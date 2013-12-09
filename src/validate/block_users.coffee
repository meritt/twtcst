module.exports = (users) ->
  return (tweet) ->
    if users.length > 0
      account = "#{tweet.user.screen_name}".toLowerCase()
      return false for spam in users when account is spam

    return true