var expandEntity, getImage;

expandEntity = function(text, entity) {
  text = text.replace(entity.url, entity.expanded_url);
  text = text.replace(entity.url, entity.display_url);
  return text;
};

getImage = function(entity, standard) {
  var inline, media;
  media = {
    url: entity.media_url,
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
  inline = "<a href=\"" + media.url + "\"";
  if (standard["class"]) {
    inline += " class=\"" + standard["class"] + "\"";
  }
  inline += " target=\"_blank\">";
  inline += "<img src=\"" + media.url + "\" width=\"" + media.w + "\" height=\"" + media.h + "\">";
  inline += "</a>";
  return inline;
};

module.exports = function(list) {
  return function(tweet) {
    var entity, inline, text, _i, _j, _len, _len1, _ref, _ref1;
    text = tweet.text;
    inline = false;
    if (list.urls) {
      if ((tweet.entities.urls != null) && tweet.entities.urls.length > 0) {
        _ref = tweet.entities.urls;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          entity = _ref[_i];
          text = expandEntity(text, entity);
        }
      }
    }
    if (list.media) {
      if ((tweet.entities.media != null) && tweet.entities.media.length > 0) {
        _ref1 = tweet.entities.media;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          entity = _ref1[_j];
          text = expandEntity(text, entity);
          inline = getImage(entity, list.media);
        }
      }
    }
    tweet.text = text;
    if (inline) {
      tweet.text += "\n" + inline;
    }
    return tweet;
  };
};
