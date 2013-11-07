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

// twitter stream api
twitter.filter(function(error, tweet) {
  console.log(tweet);
});
```

## Install with NPM

```bash
npm install twtcst
```

## API

`twtcst` has three parameters. The first is `words` you want to search, the second is your `oauth` tokens, and the third (optional) is `options` to define some filters, counters and views.

```js
var twitter = twtcst(words, oauth, options);
```

The `twitter` object has two methods: `search` and `filter`.

**search** implement [Twitter Search API](http://dev.twitter.com/docs/api/1.1/get/search/tweets). It takes a callback as an argument. The callback will be caused when all tweets are found. The first argument of callback is error (if it has occured) and the second is array of tweets.

```js
twitter.search(function(error, tweets) {
  if (tweets) {
    tweets.forEach(function(tweet) {
      message(tweet);
    });
  }
});
```

**filter** implement [Twitter Streaming API](http://dev.twitter.com/docs/api/1.1/post/statuses/filter). It cause callback and passed new tweet to it every time new tweet appears in Twitter Stream. The filter pass to callback two options: `error` and `tweet`.

```js
twitter.filter(function(error, tweet) {
  if (tweet) {
    message(tweet);
  }
});
```

**Format of tweets** is similar in both cases:

```js
{
  id: "Tweet id"
  link: "Link to user page on Twitter"
  avatar: "Link to user profile image"
  login: "User login (@username without @)"
  name: "User name or login"
  text: "Improved text of the tweet"
  date: "YYYY-MM-DD HH:MM"
  iso: "Date in ISO"
}
```

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

**lang** is `array` of languages. If the language of tweet is not in the array, the tweet won’t be displayed.

```js
"lang": ["en", "ru"]
```

**spam** is `array` of strings. Tweets contain one of the strings won’t be displayed.

```js
"spam": [
  "text/javascript",
  "jquery"
]
```

**mute** is `array` of usernames. Tweets writen by people specified in this array won’t be displayed.

```js
"mute": [
  "simonenko",
  "isquariel"
]
```

**retweets** is `boolean`. If it is `false` retweets won’t be displayed. The variable is `false` by default.

```js
"retweets": false
```

**mentions** work as **retweets**. If it is `false` mentions won’t be displayed.

```js
"mentions": false
```

**userpics** is `boolean`. If it is `true` tweet posted by users with default avatar won’t be displayed.

```js
"userpics": true
```

**hashtags** is `number` defining max quantity of hashtags in tweets. Tweets contains more hashtags than specified won’t be displayed.

```js
"hashtags": 5
```

**count** is boolean. If it is true filter will be send count of all tweets with every tweet else it won’t.

```js
"count": true
```

**storage** specify file where save tweet quantity filtered by your request. It will be used only if **count** is true.

```js
"storage": "count.txt"
```

**media** specify settings for images in tweets. You can specify width and height of images and class of links images wrapped in.

```js
"media": {
  "width": 500,
  "height": 500,
  "class": "tweet_image"
}
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
node examples/socket-server.js
```

and open the examples/index.html in your browser.

---

## Authors

* [Alexey Simonenko](//github.com/meritt), [alexey@simonenko.su](mailto:alexey@simonenko.su), [simonenko.su](http://simonenko.su)
* [Sophia Ilinova](//github.com/isquariel), [tavsophi@gmail.com](mailto:tavsophi@gmail.com)

## License

The MIT License, see the included `License.md` file.
