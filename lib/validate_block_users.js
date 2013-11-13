module.exports = function(user_list) {
  return function(tweet) {
    var account, spam, _i, _len;
    if (user_list.length > 0) {
      account = ("" + tweet.user.screen_name).toLowerCase();
      for (_i = 0, _len = user_list.length; _i < _len; _i++) {
        spam = user_list[_i];
        if (account === spam) {
          return false;
        }
      }
    }
    return true;
  };
};
