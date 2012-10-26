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

clients = []

io = require('socket.io').listen(8080)
io.sockets.on 'connection', (socket) -> clients.push socket

request = https.get
  headers: Authorization: 'Basic ' + encode argv.name + ':' + argv.password
  host: 'stream.twitter.com'
  port: 443
  path: "/1.1/statuses/filter.json?include_entities=true&track=" + encodeURIComponent argv.hash
  method: 'GET'

request.on 'response', (response) ->
  response.setEncoding 'utf8'

  body = ''
  response.on 'data', (chunk) ->
    body += chunk

    newline = body.indexOf "\r"
    if newline isnt -1
      try
        message = body.slice 0, newline
        if message? and message isnt ''
          tweet = JSON.parse message

          text = twitter.autoLink tweet.text
          if tweet.entities?
            if tweet.entities.urls? and tweet.entities.urls.length > 0
              for entity in tweet.entities.urls
                text = text.replace entity.url, entity.expanded_url
                text = text.replace entity.url, entity.display_url

            if tweet.entities.media? and tweet.entities.media.length > 0
              for entity in tweet.entities.media
                text = text.replace entity.url, entity.expanded_url
                text = text.replace entity.url, entity.display_url

          data =
            id: tweet.id_str
            link: "http://twitter.com/#{tweet.user.screen_name}"
            avatar: tweet.user.profile_image_url
            login: tweet.user.screen_name
            name: tweet.user.name or tweet.user.screen_name
            text: text

      catch error
        tweet = null
        data = null
        console.log "Error when parsing JSON: #{error}"

      if data isnt null
        clients.forEach (client) ->
          if client and client.disconnected is false
            client.send JSON.stringify data

request.end()