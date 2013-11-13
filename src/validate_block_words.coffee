module.exports = (word_list) ->
  (tweet) ->
    text = tweet.text

    if tweet.entities and tweet.entities.urls? and tweet.entities.urls.length > 0
      for entity in tweet.entities.urls
        text = text.replace entity.url, entity.expanded_url

    text = text.toLowerCase()

    return false for word in word_list when text.indexOf(word) isnt -1
    return true
