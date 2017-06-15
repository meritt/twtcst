module.exports = function (users) {
  return function (tweet) {
    if (!users || users.length === 0) {
      return true;
    }

    const account = `${tweet.user.screen_name}`.toLowerCase();

    for (let i = 0; i < users.length; i++) {
      if (account === users[i]) {
        return false;
      }
    }

    return true;
  };
};
