module.exports = ->
  return (tweet) ->
    id:     tweet.id_str
    link:   "http://twitter.com/#{tweet.user.screen_name}"
    avatar: tweet.user.profile_image_url
    login:  tweet.user.screen_name
    name:   tweet.user.name or tweet.user.screen_name
    text:   tweet.text
    date:   tweet.human_date
    iso:    tweet.iso_date