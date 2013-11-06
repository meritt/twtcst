"use strict";

var oauth = {
  // 'consumer_key': '',     FILL THIS
  // 'consumer_secret': '',  FILL THIS
  // 'token': '',            FILL THIS
  // 'token_secret': ''      FILL THIS
},

options = require('./options'),
twtcst  = require('./../lib/index'),

twitter = twtcst(['#js', '#nodejs'], oauth, options);

twitter.filter(function(error, tweet) {
  if (!error) {
    console.log(tweet);
  }
});