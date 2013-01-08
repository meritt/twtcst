// Generated by CoffeeScript 1.4.0
(function() {
  var argv, clients, encode, https, io, request, twitter;

  https = require('https');

  encode = require('b64').encode;

  twitter = require('twitter-text');

  argv = require('optimist').usage('Missing username or password.\nUsage: $0').demand('n').alias('n', 'name').describe('n', 'Twitter username').demand('p').alias('p', 'password').describe('p', 'Twitter password')["default"]('hash', 'mac,iphone,ipad').alias('h', 'hash').describe('h', 'Search hash tag').argv;

  clients = [];

  io = require('socket.io').listen(8080);

  io.sockets.on('connection', function(socket) {
    return clients.push(socket);
  });

  request = https.get({
    headers: {
      Authorization: 'Basic ' + encode(argv.name + ':' + argv.password)
    },
    host: 'stream.twitter.com',
    port: 443,
    path: "/1.1/statuses/filter.json?include_entities=true&track=" + encodeURIComponent(argv.hash),
    method: 'GET'
  });

  request.on('response', function(response) {
    var body;
    response.setEncoding('utf8');
    body = '';
    return response.on('data', function(chunk) {
      var data, entity, message, newline, text, tweet, _i, _j, _len, _len1, _ref, _ref1;
      body += chunk;
      newline = body.indexOf("\r");
      if (newline !== -1) {
        try {
          message = body.slice(0, newline);
          if ((message != null) && message !== '') {
            tweet = JSON.parse(message);
            text = twitter.autoLink(tweet.text);
            if (tweet.entities != null) {
              if ((tweet.entities.urls != null) && tweet.entities.urls.length > 0) {
                _ref = tweet.entities.urls;
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  entity = _ref[_i];
                  text = text.replace(entity.url, entity.expanded_url);
                  text = text.replace(entity.url, entity.display_url);
                }
              }
              if ((tweet.entities.media != null) && tweet.entities.media.length > 0) {
                _ref1 = tweet.entities.media;
                for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                  entity = _ref1[_j];
                  text = text.replace(entity.url, entity.expanded_url);
                  text = text.replace(entity.url, entity.display_url);
                }
              }
            }
            data = {
              id: tweet.id_str,
              link: "http://twitter.com/" + tweet.user.screen_name,
              avatar: tweet.user.profile_image_url,
              login: tweet.user.screen_name,
              name: tweet.user.name || tweet.user.screen_name,
              text: text
            };
          }
        } catch (error) {
          tweet = null;
          data = null;
          console.log("Error when parsing JSON: " + error);
        }
        if (data !== null) {
          clients.forEach(function(client) {
            if (client && client.disconnected === false) {
              return client.send(JSON.stringify(data));
            }
          });
        }
      }
      return body = body.slice(newline + 1);
    });
  });

  request.end();

}).call(this);