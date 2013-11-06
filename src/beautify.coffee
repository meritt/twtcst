twitter = require 'twitter-text'

expandEntity = (text, entity) ->
  text = text.replace entity.url, entity.expanded_url
  text = text.replace entity.url, entity.display_url

getImage = (entity) ->

  media =
    url: entity.media_url
    w: parseInt entity.sizes.small.w, 10
    h: parseInt entity.sizes.small.h, 10

  if media.h > 150
    media.w = parseInt media.w * 150 / media.h, 10
    media.h = 150

  if media.w > 500
    media.h = parseInt media.h * 500 / media.w, 10
    media.w = 500

  inline = "<a href=\"#{media.url}\" class=\"twtcst-image\" target=\"_blank\">"
  inline += "<img src=\"#{media.url}\" width=\"#{media.w}\" height=\"#{media.h}\">"
  inline += "</a>"

pad = (n) -> if n < 10 then "0#{n}" else n

module.exports = (options) ->
  return (result, auto = true) ->
    if auto is true
      text = twitter.autoLink result.text, target: '_blank'
    else
      text = twitter.autoLinkUrlsCustom result.text, target: '_blank'

    if result.entities.urls? and result.entities.urls.length > 0
      for entity in result.entities.urls
        text = expandEntity text, entity

    inline = false
    if result.entities.media? and result.entities.media.length > 0
      for entity in result.entities.media
        text = expandEntity text, entity
        inline = getImage entity


    result.text = text
    result.text += inline if inline

    image = result.user.profile_image_url
    pos = image.lastIndexOf '_'
    result.user.profile_image_url = "#{image.substring(0, pos)}_bigger#{image.substring(pos + 7)}"

    date = new Date result.created_at
    created = "#{date.getFullYear()}-#{pad(date.getMonth() + 1)}-#{pad(date.getDate())} #{pad(date.getHours())}:#{pad(date.getMinutes())}"

    data =
      id: result.id_str
      link: "http://twitter.com/#{result.user.screen_name}"
      avatar: result.user.profile_image_url
      login: result.user.screen_name
      name: result.user.name or result.user.screen_name
      text: result.text
      date: created
      iso: date.toISOString()

