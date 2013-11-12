pad = (n) -> if n < 10 then "0#{n}" else n

module.exports = () ->
  (tweet) ->
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

    tweet.human_date = date.join('-') + ' ' + time.join(':')
    tweet.iso_date = created.toISOString()
    tweet
