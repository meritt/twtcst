twitter = require 'twitter-text'

module.exports = (options) ->
  return (result, auto = true) ->
    if auto is true
      text = twitter.autoLink result.text, target: '_blank'
    else
      text = twitter.autoLinkUrlsCustom result.text, target: '_blank'

    if result.entities.urls? and result.entities.urls.length > 0
      for entity in result.entities.urls
        text = text.replace entity.url, entity.expanded_url
        text = text.replace entity.url, entity.display_url

    media = false
    if result.entities.media? and result.entities.media.length > 0
      for entity in result.entities.media
        text = text.replace entity.url, entity.expanded_url
        text = text.replace entity.url, entity.display_url

        media =
          url: entity.media_url
          w: parseInt entity.sizes.small.w, 10
          h: parseInt entity.sizes.small.h, 10

    result.text = text
    result.media = media

    image = result.user.profile_image_url
    pos = image.lastIndexOf '_'
    result.user.profile_image_url = image.substring(0, pos) + '_bigger' + image.substring(pos + 7)

    result

