const request = require('request');

let params = function (options) {
  return {
    url: 'https://stream.twitter.com/1.1/statuses/filter.json',
    oauth: options.oauth,
    form: {
      'include_entities': true,
      'track': options.words.join(',')
    }
  };
};

const openStream = function (validate, beautify, fn) {
  const stream = request.post(params, function (error, response, body) {
    if (error) {
      fn(error, false);
      return;
    }
  });

  stream.on('data', function (buffer) {
    let tweet = false;

    try {
      tweet = JSON.parse(buffer.toString());

      if (tweet && tweet.disconnect) {
        console.log(`Disconnected from twitter: ${tweet.disconnect.reason}`);
        stream.end();
        return;
      }
    } catch (err) {
      tweet = false;
    }

    if (tweet && validate(tweet)) {
      if (beautify) {
        tweet = beautify(tweet, false);
      }

      fn(null, tweet);
    }
  });

  stream.on('end', function () {
    console.log('Connecting to twitter stream again?');
    // re-try?
    // openStream(validate, beautify, fn);
  });
};

module.exports = function (options) {
  params = params(options);

  return function (validate, beautify, fn) {
    openStream(validate, beautify, fn);
  };
};
