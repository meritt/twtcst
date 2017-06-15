module.exports = function (fns) {
  return function (tweet) {
    for (let i = 0; i < fns.length; i++) {
      tweet = fns[i](tweet);
    }

    return tweet;
  };
};
