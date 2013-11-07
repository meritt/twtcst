# Twitter online conference

It’s a nodejs module provide you easy interface to get the stream of tweets.

[Article about this in Russian in my blog.](http://simonenko.su/53381781858/pulse-of-web-developments)

```js
var twtcst = require('twtcst');

// array of words you want to track
var words = ['javascript', 'coffeescript'];

// object contains your oauth tokens
var oauth = {
  'consumer_key': '',
  'consumer_secret': '',
  'token': '',
  'token_secret': ''
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

`twtcst` has third parameters for options.

```js
var twitter = twtcst(words, oauth, options);
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
  '"text/javascript"',
  'javascript:void(0)'
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

**count** specify file where save tweet quantity filtered by your request

```js
"count": "count.txt"
```

---

## Authors

* [Alexey Simonenko](mailto:alexey@simonenko.su), [simonenko.su](http://simonenko.su)
* [Sophia Ilinova](mailto:tavsophi@gmail.com)

## License

The MIT License, see the included `License.md` file.
