var expandEntity, getImage, pad, twitter;

twitter = require('twitter-text');

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
  if (media.h > standard.height) {
    media.w = parseInt(media.w * standard.height / media.h, 10);
    media.h = standard.height;
  }
  if (media.w > standard.width) {
    media.h = parseInt(media.h * standard.width / media.w, 10);
    media.w = standard.width;
  }
  inline = "<a href=\"" + media.url + "\" class=\"" + standard["class"] + "\" target=\"_blank\">";
  inline += "<img src=\"" + media.url + "\" width=\"" + media.w + "\" height=\"" + media.h + "\">";
  inline += "</a>";
  return inline;
};

pad = function(n) {
  if (n < 10) {
    return "0" + n;
  } else {
    return n;
  }
};

module.exports = function(options, counter) {
  return function(tweet, auto) {
    var created, date, entity, image, inline, pos, text, time, _i, _j, _len, _len1, _ref, _ref1;
    if (auto == null) {
      auto = true;
    }
    if (auto === true) {
      text = twitter.autoLink(tweet.text, {
        target: '_blank'
      });
    } else {
      text = twitter.autoLinkUrlsCustom(tweet.text, {
        target: '_blank'
      });
    }
    if ((tweet.entities.urls != null) && tweet.entities.urls.length > 0) {
      _ref = tweet.entities.urls;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entity = _ref[_i];
        text = expandEntity(text, entity);
      }
    }
    inline = false;
    if ((tweet.entities.media != null) && tweet.entities.media.length > 0) {
      _ref1 = tweet.entities.media;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        entity = _ref1[_j];
        text = expandEntity(text, entity);
        inline = getImage(entity, options.media);
      }
    }
    tweet.text = text;
    if (inline) {
      tweet.text += "\n" + inline;
    }
    image = tweet.user.profile_image_url;
    pos = image.lastIndexOf('_');
    tweet.user.profile_image_url = "" + (image.substring(0, pos)) + "_bigger" + (image.substring(pos + 7));
    created = new Date(tweet.created_at);
    date = [created.getFullYear(), pad(created.getMonth() + 1), pad(created.getDate())];
    time = [pad(created.getHours()), pad(created.getMinutes())];
    return {
      id: tweet.id_str,
      link: "http://twitter.com/" + tweet.user.screen_name,
      avatar: tweet.user.profile_image_url,
      login: tweet.user.screen_name,
      name: tweet.user.name || tweet.user.screen_name,
      text: tweet.text,
      date: date.join('-') + ' ' + time.join(':'),
      iso: created.toISOString()
    };
  };
};
