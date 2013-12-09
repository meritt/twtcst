module.exports = (fns) ->
  return (tweet) ->
    tweet = fn tweet for fn in fns
    tweet