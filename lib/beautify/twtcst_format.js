module.exports = function () {
  return function (tweet) {
    return {
      id: tweet.id_str,
      link: `https://twitter.com/${tweet.user.screen_name}`,
      avatar: tweet.user.profile_image_url_https,
      login: tweet.user.screen_name,
      name: tweet.user.name || tweet.user.screen_name,
      text: tweet.text,
      date: tweet.humanDate,
      iso: tweet.isoDate
    };
  };
};
