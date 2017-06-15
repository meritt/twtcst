module.exports = function () {
  return function (tweet) {
    if (tweet.retweeted === true || tweet.text.indexOf('RT ') === 0) {
      return false;
    }

    return true;
  };
};
