"use strict";

var twtcst = require('./../lib/index'),

oauth = require('./stuff/oauth'),
options = require('./stuff/options'),

twitter = twtcst(['#js', '#nodejs'], oauth, options);

twitter.search(function(error, tweets) {
  console.log(tweets);

  twitter.filter(function(error, tweet) {
    if (tweet) {
      console.log(tweet);
    }
  });
});