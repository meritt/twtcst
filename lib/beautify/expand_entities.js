const expandEntity = function (text, entity) {
  text = text.replace(entity.url, entity.expanded_url);
  text = text.replace(entity.url, entity.display_url);

  return text;
};

const getImageTemplate = function (entity, standard) {
  const media = {
    url: entity.media_url_https,
    w: parseInt(entity.sizes.medium.w, 10),
    h: parseInt(entity.sizes.medium.h, 10)
  };

  if (standard.height) {
    if (media.h > standard.height) {
      media.w = parseInt(media.w * standard.height / media.h, 10);
      media.h = standard.height;
    }
  }

  if (standard.width) {
    if (media.w > standard.width) {
      media.h = parseInt(media.h * standard.width / media.w, 10);
      media.w = standard.width;
    }
  }

  const attr = (standard['class']) ? ` class="${standard['class']}"` : '';

  const template = `
<a href="${media.url}"${attr} target="_blank" rel="nofollow noopener">
  <img src="${media.url}" width="${media.w}" height="${media.h}">
</a>
`;

  return template;
};

module.exports = function (list) {
  return function (tweet) {
    let text = tweet.text;
    let inline = false;

    const entities = tweet.entities;

    if (list.urls) {
      if (entities.urls && entities.urls.length > 0) {
        for (let i = 0; i < entities.urls.length; i++) {
          text = expandEntity(text, entities.urls[i]);
        }
      }
    }

    if (list.media) {
      if (entities.media && entities.media.length > 0) {
        for (let i = 0; i < entities.media.length; i++) {
          text = expandEntity(text, entities.media[i]);
          inline = getImageTemplate(entities.media[i], list.media);
        }
      }
    }

    tweet.text = text;

    if (inline) {
      tweet.text = `${tweet.text}\n${inline}`;
    }

    return tweet;
  };
};
