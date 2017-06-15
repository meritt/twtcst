const request = require('request');
const qs = require('querystring');

const count = 10;

let params = function (options) {
  const host = 'https://api.twitter.com';

  const data = {
    'result_type': 'recent',
    'count': 60,
    'q': options.words.join(' OR ')
  };

  return {
    url: `${host}/1.1/search/tweets.json?${qs.stringify(data)}`,
    oauth: options.oauth,
    json: true
  };
};

module.exports = function (options) {
  params = params(options);

  return function (validate, beautify, fn) {
    return request.get(params, function (err, response, body) {
      if (err) {
        fn(err, false);
        return;
      }

      if (response.statusCode !== 200) {
        fn(`Response code isnt 200 (${response.statusCode})`, false);
        return;
      }

      const tweets = body.statuses || [];
      const results = [];

      while (results.length !== count && tweets.length > 0) {
        let tweet = false;

        try {
          tweet = tweets.shift();
        } catch (ignore) {
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

      fn(null, results);
      return;
    });
  };
};
