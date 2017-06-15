module.exports = function () {
  return function (tweet) {
    const text = tweet.text;

    if (text.indexOf('@') === 0 || text.indexOf('.@') === 0) {
      return false;
    }

    return true;
  };
};
