var params, qs;

qs = require('querystring');

params = function(options) {
  var data;
  data = {
    result_type: 'recent',
    count: 60,
    q: options.words.join(' OR ')
  };
  return {
    url: "https://api.twitter.com/1.1/search/tweets.json?" + (qs.stringify(data)),
    oauth: options.oauth,
    json: true
  };
};

module.exports = function(options) {
  var count;
  count = 10;
  params = params(options);
  return function(validate, beautify, fn) {
    return require('request').get(params, function(error, response, body) {
      var results, tweet, tweets;
      if (error) {
        return fn(error, false);
      }
      if (response.statusCode !== 200) {
        return fn("Response code isnt 200 (" + response.statusCode + ")", false);
      }
      tweets = body.statuses || [];
      results = [];
      while (results.length !== count && tweets.length > 0) {
        try {
          tweet = tweets.shift();
        } catch (_error) {
          error = _error;
          tweet = false;
        }
        if (!tweet) {
          break;
        }
        if (validate(tweet)) {
          if (beautify) {
            tweet = beautify(tweet);
          }
          results.push(tweet);
        }
      }
      return fn(null, results);
    });
  };
};
