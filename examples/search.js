"use strict";

var oauth = require('./oauth'),
options = require('./options'),
twtcst  = require('./../lib/index'),

twitter = twtcst(['#js', '#nodejs'], oauth, options);

twitter.search(function(tweets) {
  console.log(tweets);
  twitter.filter(function(error, tweet) {
    if (!error) {
      console.log(tweet);
    }
  });
});
