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
    url: "https://api.twitter.com/" + options.version + "/search/tweets.json?" + (qs.stringify(data)),
    oauth: options.oauth,
    json: true
  };
};

module.exports = function(options, beautify, validate, counter) {
  var count;
  count = 10;
  params = params(options);
  return function(fn) {
    return require('request').get(params, function(error, response, body) {
      var n, results, tweet, tweets, _i, _len;
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
          results.push(beautify(tweet, false));
        }
      }
      if (counter) {
        n = counter.set(results.length);
        for (_i = 0, _len = results.length; _i < _len; _i++) {
          tweet = results[_i];
          tweet.counter = n;
        }
      }
      return fn(null, results);
    });
  };
};
