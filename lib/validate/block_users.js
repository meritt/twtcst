module.exports = function(users) {
  return function(tweet) {
    var account, spam, _i, _len;
    if (users.length > 0) {
      account = ("" + tweet.user.screen_name).toLowerCase();
      for (_i = 0, _len = users.length; _i < _len; _i++) {
        spam = users[_i];
        if (account === spam) {
          return false;
        }
      }
    }
    return true;
  };
};
