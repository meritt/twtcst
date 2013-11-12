module.exports = (lang_list) ->
  (tweet) ->
    if tweet.user.lang?
      return false if tweet.user.lang not in lang_list
    return true
