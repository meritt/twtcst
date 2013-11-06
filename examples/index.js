var oauth = {
      "consumer_key": "",
      "consumer_secret": "",
      "token": "",
      "token_secret": ""
    },
    words = ['#js', '#nodejs'],
    options = require('./options'),
    twtcst = require('./../lib/index')(words, oauth, options);


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

