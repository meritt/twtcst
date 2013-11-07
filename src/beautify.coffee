twitter = require 'twitter-text'

expandEntity = (text, entity) ->
  text = text.replace entity.url, entity.expanded_url
  text = text.replace entity.url, entity.display_url
  text

getImage = (entity, standard) ->
  media =
    url: entity.media_url
    w: parseInt entity.sizes.medium.w, 10
    h: parseInt entity.sizes.medium.h, 10

  if media.h > standard.height
    media.w = parseInt media.w * standard.height / media.h, 10
    media.h = standard.height

  if media.w > standard.width
    media.h = parseInt media.h * standard.width / media.w, 10
    media.w = standard.width

  inline = "<a href=\"#{media.url}\" class=\"#{standard.class}\" target=\"_blank\">"
  inline += "<img src=\"#{media.url}\" width=\"#{media.w}\" height=\"#{media.h}\">"
  inline += "</a>"
  inline

pad = (n) -> if n < 10 then "0#{n}" else n

module.exports = (options, counter) ->
  return (tweet, auto = true) ->
    if auto is true
      text = twitter.autoLink tweet.text, target: '_blank'
    else
      text = twitter.autoLinkUrlsCustom tweet.text, target: '_blank'

    if tweet.entities.urls? and tweet.entities.urls.length > 0
      for entity in tweet.entities.urls
        text = expandEntity text, entity

    inline = false
    if tweet.entities.media? and tweet.entities.media.length > 0
      for entity in tweet.entities.media
        text = expandEntity text, entity
        inline = getImage entity, options.media

    tweet.text = text
    tweet.text += "\n#{inline}" if inline

    image = tweet.user.profile_image_url
    pos = image.lastIndexOf '_'
    tweet.user.profile_image_url = "#{image.substring(0, pos)}_bigger#{image.substring(pos + 7)}"

    created = new Date tweet.created_at

    date = [
      created.getFullYear()
      pad created.getMonth() + 1
      pad created.getDate()
    ]

    time = [
      pad created.getHours()
      pad created.getMinutes()
    ]

    id: tweet.id_str
    link: "http://twitter.com/#{tweet.user.screen_name}"
    avatar: tweet.user.profile_image_url
    login: tweet.user.screen_name
    name: tweet.user.name or tweet.user.screen_name
    text: tweet.text
    date: date.join('-') + ' ' + time.join(':')
    iso: created.toISOString()