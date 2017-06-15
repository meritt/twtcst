module.exports = function (fns) {
  return function (tweet) {
    if (!tweet || !tweet.user || !tweet.text) {
      return false;
    }

    for (let i = 0; i < fns.length; i++) {
      let result = fns[i](tweet);
      if (!result) {
        return false;
      }
    }

    return true;
  };
};
