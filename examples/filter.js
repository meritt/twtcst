"use strict";

var oauth = require('./oauth'),
    options = require('./options'),
    twtcst  = require('./../lib/index'),

    twitter = twtcst(['#js', '#nodejs'], oauth, options);

twitter.filter(function (error, tweet) {
  if (!error) {
    console.log(tweet);
  }
});
