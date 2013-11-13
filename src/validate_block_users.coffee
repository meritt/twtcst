module.exports = (user_list) ->
  (tweet) ->
    if user_list.length > 0
      account = "#{tweet.user.screen_name}".toLowerCase()
      return false for spam in user_list when account is spam
    return true
