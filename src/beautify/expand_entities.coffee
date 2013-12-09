expandEntity = (text, entity) ->
  text = text.replace entity.url, entity.expanded_url
  text = text.replace entity.url, entity.display_url
  text

getImage = (entity, standard) ->
  media =
    url: entity.media_url
    w: parseInt entity.sizes.medium.w, 10
    h: parseInt entity.sizes.medium.h, 10

  if standard.height
    if media.h > standard.height
      media.w = parseInt media.w * standard.height / media.h, 10
      media.h = standard.height

  if standard.width
    if media.w > standard.width
      media.h = parseInt media.h * standard.width / media.w, 10
      media.w = standard.width

  inline = "<a href=\"#{media.url}\""
  inline += " class=\"#{standard.class}\"" if standard.class
  inline += " target=\"_blank\">"
  inline += "<img src=\"#{media.url}\" width=\"#{media.w}\" height=\"#{media.h}\">"
  inline += "</a>"
  inline

module.exports = (list) ->
  return (tweet) ->
    text = tweet.text
    inline = false

    if list.urls
      if tweet.entities.urls? and tweet.entities.urls.length > 0
        for entity in tweet.entities.urls
          text = expandEntity text, entity

    if list.media
      if tweet.entities.media? and tweet.entities.media.length > 0
        for entity in tweet.entities.media
          text = expandEntity text, entity
          inline = getImage entity, list.media

    tweet.text = text
    tweet.text += "\n#{inline}" if inline
    tweet