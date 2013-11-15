var makeRequest, params, request;

params = function(options) {
  return {
    url: "https://stream.twitter.com/1.1/statuses/filter.json",
    oauth: options.oauth,
    form: {
      include_entities: true,
      track: options.words.join(',')
    }
  };
};

request = require('request');

makeRequest = function(validate, beautify, fn) {
  var stream;
  console.log('Open new request to Twitter Stream API');
  stream = request.post(params, function(error, response, body) {
    if (error) {
      return fn(error, false);
    }
  });
  stream.on('end', function() {
    console.log("Connecting to twitter stream again");
    makeRequest(validate, beautify, fn);
  });
  stream.on('data', function(buffer) {
    var error, tweet;
    try {
      tweet = JSON.parse(buffer.toString());
      if (tweet && tweet.disconnect) {
        console.log("Disconnected from twitter stream: " + disconnect.reason);
        stream.end();
        return;
      }
    } catch (_error) {
      error = _error;
      console.log("Error from twitter stream try/catch " + error.message);
      tweet = false;
    }
    if (tweet && validate(tweet)) {
      if (beautify) {
        tweet = beautify(tweet, false);
      }
      fn(null, tweet);
    }
  });
};

module.exports = function(options) {
  params = params(options);
  return function(validate, beautify, fn) {
    makeRequest(validate, beautify, fn);
  };
};
