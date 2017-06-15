const pad = (n) => (n < 10) ? `0${n}` : `${n}`;

module.exports = function () {
  return function (tweet) {
    const created = new Date(tweet.created_at);

    const date = [
      created.getFullYear(),
      pad(created.getMonth() + 1),
      pad(created.getDate())
    ];

    const time = [
      pad(created.getHours()),
      pad(created.getMinutes())
    ];

    tweet.humanDate = `${date.join('-')} ${time.join(':')}`;
    tweet.isoDate = created.toISOString();

    return tweet;
  };
};
