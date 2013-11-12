# Twitter Broadcast

It’s a nodejs module provide you easy interface to get the stream of tweets.

[Article about this in Russian in my blog.](http://simonenko.su/53381781858/pulse-of-web-developments)

```js
var twtcst = require("twtcst");

// array of words you want to track
var words = ["javascript", "coffeescript"];

// object contains your oauth tokens
var oauth = {
  "consumer_key": "",
  "consumer_secret": "",
  "token": "",
  "token_secret": ""
};

var twitter = twtcst(words, oauth);

var validate = twitter.validate();
var beautify = twitter.beautify();

// twitter stream api
twitter.filter(validate, beautify, function(error, tweet) {
  console.log(tweet);
});
```

## Install with NPM

```bash
npm install twtcst
```

## API

`twtcst` has three parameters. The first is `words` you want to search, the second is your `oauth` tokens, and the third (optional) is `options`.

```js
var twitter = twtcst(words, oauth, options);
```

The `twitter` object has two methods: `search` and `filter`.

**search** implement [Twitter Search API](http://dev.twitter.com/docs/api/1.1/get/search/tweets). It takes a three arguments: validate function, beautify function and a callback. Functions `validate` and `beautify` will be described below. The callback will be caused when all tweets are found. The first argument of callback is error (if it has occured) and the second is array of tweets.

```js
twitter.search(validate, beautify, function(error, tweets) {
  if (tweets) {
    tweets.forEach(function(tweet) {
      message(tweet);
    });
  }
});
```

**filter** implement [Twitter Streaming API](http://dev.twitter.com/docs/api/1.1/post/statuses/filter). It has three arguments: `validate`, `beautify` and callback. Filter cause callback and passed new tweet to it every time new tweet appears in Twitter Stream. The filter pass to callback two options: `error` and `tweet`.

```js
twitter.filter(validate, beautify, function(error, tweet) {
  if (tweet) {
    message(tweet);
  }
});
```

**Format of tweets** depends on the `beautify` function.

### Words

`words` is array contains words you want to search. It also can contains hashtags started with hash, e.g.:

```js
var words = [
  "#javascript",
  "#coffeescript"
];
```

### OAuth tokens

`oauth` is an object in format required by Twitter API. You can get tokens by [creating new app](http://dev.twitter.com/apps/new) or [from existing app](http://dev.twitter.com/apps).

```js
var oauth = {
  "consumer_key": "",
  "consumer_secret": "",
  "token": "",
  "token_secret": ""
};
```

### Options

All options are optional.

**version** is `string` of Twitter Stream API version (1.1 by default)

```js
"version": "1.1"
```

**count** is boolean. If it is true filter will be send count of all tweets with every tweet else it won’t.

```js
"count": true
```

**storage** specify file where save tweet quantity filtered by your request. It will be used only if **count** is true.

```js
"storage": "count.txt"
```

### Validate

**validate** is a function to filter your tweets. Pass it an array of functions you want to filter your tweets.

```js
var validate = twitter.validate([
  twitter.allowLangs(['en', 'ru']),
  twitter.blockUsers(['simonenko', 'isquariel']),
  twitter.blockWords(['test', 'word', 'array', '#php']),
  twitter.noRetweets(),
  twitter.noMentions(),
  twitter.noDefaults(),
  twitter.maxHashlen(5),
  yourOwnFilter
]);

If tweet doesn’t match any of checks you define, it won’t pass on.
Each of these functions takes a tweet as an argument and return true if tweet is valid and false otherwise. E.g.:

```js
noRetweets = function() {
  return function(tweet) {
    if (tweet.text.indexOf('RT ') === 0) {
      return false;
    }
    return true;
  };
};
```

All tweets is in format served by Twitter: [description](https://dev.twitter.com/docs/platform-objects/tweets)

There are some built-in functions to filter:

**blockUsers** filter tweets posted by users you pass to the function. To don’t show tweets from users @simonenko and @isquariel just exec

```js
validate = twitter.validate([
  twitter.blockUsers(['simonenko', 'isquariel'])
]);
```

**blockWords** filter tweets that contains specified words. To hide tweets that contains word ruby and hashtag #php write

```js
validate = twitter.validate([
  twitter.blockWords(['#php', 'ruby'])
]);
```

**maxHashlen** do not skip tweets that contains more hashtags than you specify.

```js
validate = twitter.validate([
  twitter.maxHashlen(5)
]);
```

**allowLangs** show tweets written in specified languages only. E.g.:

```js
validate = twitter.validate([
  twitter.allowLangs(['en', 'ru'])
]);
```

**noRetweets** do not skip old-format retweets (RT @username ...). To use it exec:

```js
validate = twitter.validate([
  twitter.noRetweets()
]);
```

**noMentions** do not skip tweets start with @username and .@username. To use it exec:

```js
validate = twitter.validate([
  twitter.noMentions()
]);
```

**noDefaults** do not skip tweets posted by users with default userpic. To use it exec:

```js
validate = twitter.validate([
  twitter.noDefaults()
]);
```

## Development

To get the source form Github execute

```bash
git clone git@github.com:serenity/twtcst.git
cd twtcst

npm link
cake build
```

Then you should specify your access token in `examples/staff/oauth.js`. Now you have a working example.

To try `twtcst.filter` execute

```bash
node examples/filter.js
```

The script puts new tweet to console.

To try `twtcst.search` execute

```bash
node examples/search.js
```

First the scripts puts an array of tweets get from search to console and then it will output tweets from stream.

Finally, you can view the working html page with stream of tweets. Just execute

```bash
node examples/socket.js
```

and open the examples/index.html in your browser.

---

## Authors

* [Alexey Simonenko](//github.com/meritt), [alexey@simonenko.su](mailto:alexey@simonenko.su), [simonenko.su](http://simonenko.su)
* [Sophia Ilinova](//github.com/isquariel), [tavsophi@gmail.com](mailto:tavsophi@gmail.com)

## License

The MIT License, see the included `License.md` file.
