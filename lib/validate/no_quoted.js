module.exports = function () {
  return function (tweet) {
    if (tweet.is_quote_status === true) {
      return false;
    }

    return true;
  };
};
