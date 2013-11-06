var options = require('./options'),
    twtcst = require('./../lib/index')(options);

twtcst.search(function (error, tweet) {
  if (error) {
    console.log(error);
  } else {
    console.log(tweet);
  }
  twtcst.filter(function (error, tweet) {
    if (error) {
      console.log(error);
    } else {
      console.log(tweet);
    }
  });
});

