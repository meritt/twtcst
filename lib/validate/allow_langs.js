module.exports = function (lang) {
  return function (tweet) {
    if (tweet.user.lang !== null) {
      if (!lang.includes(tweet.user.lang)) {
        return false;
      }
    }

    return true;
  };
};
