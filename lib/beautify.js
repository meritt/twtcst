module.exports = function(fns) {
  return function(tweet) {
    var fn, _i, _len;
    for (_i = 0, _len = fns.length; _i < _len; _i++) {
      fn = fns[_i];
      tweet = fn(tweet);
    }
    return tweet;
  };
};
