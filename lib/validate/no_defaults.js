module.exports = function () {
  return function (tweet) {
    if (tweet.user.profile_image_url.indexOf('default_profile_images') > -1) {
      return false;
    }

    return true;
  };
};
