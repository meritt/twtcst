"use strict";
var beautify, defaults, filter, oauth_error, parse, search, v, validate;

v = require('valentine');

filter = require('./filter');

search = require('./search');

beautify = require('./beautify');

validate = require('./validate');

defaults = {
  version: 1.1,
  lang: ['en', 'ru'],
  mute: [],
  spam: [],
  retweets: false,
  mentions: false,
  userpics: true,
  hashtags: 5,
  count: false,
  storage: false,
  media: {
    width: 500,
    height: 500,
    "class": 'tweet_image'
  }
};

oauth_error = "You must specify oauth tokens, for example:\noauth = {\n  consumer_key: ''\n  consumer_secret: ''\n  token: ''\n  token_secret: ''\n}";

parse = function(words, oauth, params) {
  var options;
  if (!words || words.length < 1) {
    throw new Error('Set words for search');
  }
  if (!(oauth.consumer_key && oauth.consumer_secret && oauth.token && oauth.token_secret)) {
    throw new Error(oauth_error);
  }
  options = v.extend({}, defaults);
  options = v.extend(options, params);
  if (options.hashtags) {
    options.hashtags = parseInt(options.hashtags, 10);
    if (!(options.hashtags > -1)) {
      options.hashtags = false;
    }
  }
  options.words = words;
  options.oauth = oauth;
  return options;
};

module.exports = function(words, oauth, options) {
  var counter, _beautify, _validate;
  if (oauth == null) {
    oauth = {};
  }
  if (options == null) {
    options = {};
  }
  options = parse(words, oauth, options);
  if (options.count === true) {
    counter = require('./counter')(options.storage);
  } else {
    counter = null;
  }
  _beautify = beautify(options);
  _validate = validate(options);
  return {
    filter: filter(options, _beautify, _validate, counter),
    search: search(options, _beautify, _validate, counter)
  };
};
