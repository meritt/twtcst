"use strict";

var oauth = require('./stuff/oauth'),
options = require('./stuff/options'),
twtcst  = require('./../lib/index'),

twitter = twtcst(['#js', '#nodejs'], oauth, options);

twitter.search(function (error, tweets) {
  console.log(tweets);
  twitter.filter(function (error, tweet) {
    if (!error) {
      console.log(tweet);
    }
  });
});
