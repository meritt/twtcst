module.exports = function (words) {
  return function (tweet) {
    if (!words || words.length === 0) {
      return true;
    }

    let text = tweet.text;
    const entities = tweet.entities;

    if (entities && entities.urls && entities.urls.length > 0) {
      for (let i = 0; i < entities.urls.length; i++) {
        const entity = entities.urls[i];
        text = text.replace(entity.url, entity.expanded_url);
      }
    }

    text = text.toLowerCase();

    for (let i = 0; i < words.length; i++) {
      if (text.indexOf(words[i]) !== -1) {
        return false;
      }
    }

    return true;
  };
};
