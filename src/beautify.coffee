module.exports = (fns) ->
  (tweet) ->
    tweet = fn tweet for fn in fns
    tweet
