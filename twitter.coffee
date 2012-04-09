https    = require 'https'
{encode} = require 'b64'
twitter  = require 'twitter-text'

argv = require('optimist').usage('Missing username or password.\nUsage: $0')
                          .demand('n')
                          .alias('n', 'name')
                          .describe('n', 'Twitter username')
                          .demand('p')
                          .alias('p', 'password')
                          .describe('p', 'Twitter password')
                          .default('hash', 'mac,iphone,ipad')
                          .alias('h', 'hash')
                          .describe('h', 'Search hash tag')
                          .argv

message = ''
clients = []

io = require('socket.io').listen(8080)
io.sockets.on 'connection', (socket) -> clients.push socket

request = https.get
  host:    'stream.twitter.com'
  port:    443
  path:    '/1/statuses/filter.json?track=' + encodeURIComponent argv.hash
  headers: Authorization: 'Basic ' + encode argv.name + ':' + argv.password
  method:  'GET'

request.addListener 'response', (response) ->
  response.setEncoding 'utf8'

  response.addListener 'data', (chunk) ->
    message += chunk

    newline = message.indexOf "\r"
    if newline isnt -1
      try
        tweet = JSON.parse message.slice 0, newline
        data  =
          id:     tweet.id_str
          link:   'http://twitter.com/' + tweet.user.screen_name
          avatar: tweet.user.profile_image_url
          login:  tweet.user.screen_name
          name:   tweet.user.name || tweet.user.screen_name
          text:   twitter.autoLink tweet.text
      catch error
        tweet = null
        data  = null
        console.log 'Error when parsing JSON: ' + error

      if data isnt null
        clients.forEach (client) ->
          if client and client.disconnected is false
            client.send JSON.stringify data

    message = message.slice newline + 1

request.end()