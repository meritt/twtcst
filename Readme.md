# Twitter online conference

It’s a nodejs module provide you easy interface to get the stream of tweets.

[Article about this in Russian in my blog.](http://simonenko.su/53381781858/pulse-of-web-developments)

## Install with NPM

```bash
npm install twtcst
```

## API

Fisrt you have to require twtcst with options:

```js
var twtcst  = require('twtcst')(words, oauth, options);
```

Where ```words``` is array of words you want to track, e. g.:

```js
var words = [
  "#js",
  "#javascript",
  "js"
];
```

```oauth``` is object contains your tokens, e. g.:

```js
var oauth = {
  "consumer_key": "0123456789abcdefghijk",
  "consumer_secret": "0123456789abcdefghijklmnopqrstuvwxyzABCDE",
  "token": "01234567-01234567890abcdefghijklmnopqrstuvwxyzABCD",
  "token_secret": "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHI"
};
```

and ```options``` is object contains your options.

### Options

All options are optional.

**version** is string of Twitter Stream API version (1.1 by default)

```js
  "version": "1.1"
```

**lang** is array of languages. If the language of tweet is not in the array,
the tweet won’t be displayed.

```js
  "lang": [
    "us",
    "ru"
  ]
```

**retweets** is boolean. If it is false retweets won’t be displayed. The 
variable is true by default.

```js
  "retweets": false
```

**mentions** work as **retweets**. If it is false mentions won’t be displayed.

```js
  "mentions": false
```

**default_profile_images** is boolean. If it is false tweet posted by users with
default avatar won’t be displayed.

```js
  "default_profile_images": false
```

**spam** is array of strings. Tweets contain one of the strings won’t be
displayed.

```js
  "spam": [
    '"text/javascript"',
    'javascript:void(0)'
  ]
```

**mute** is array of usernames. Tweets writen by people specified in this array
won’t be displayed.

```js
  "mute": [
    "marketing_007",
    "spamuser"
  ]
```

**hashlength** is number defining max quantity of hashtags in tweets. Tweets
contains more hashtags than specified won’t be displayed.

```js
  "hashlength": 5
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
