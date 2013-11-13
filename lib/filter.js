var params;

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

module.exports = function(options) {
  params = params(options);
  return function(validate, beautify, fn) {
    var request;
    request = require('request').post(params, function(error, response, body) {
      if (error) {
        return fn(error, false);
      }
    });
    return request.on('data', function(buffer) {
      var error, tweet;
      try {
        tweet = JSON.parse(buffer.toString());
      } catch (_error) {
        error = _error;
        tweet = false;
      }
      if (validate(tweet)) {
        if (beautify) {
          tweet = beautify(tweet, false);
        }
        return fn(null, tweet);
      }
    });
  };
};
