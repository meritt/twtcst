(function(window) {
  "use strict";

  if (!window.io) {
    return;
  }

  var messages = [],
      keys = {},
      socket = io.connect('http://127.0.0.1:3065'),
      container = document.querySelector('#tweets'),
      template = document.querySelector('#tweet-template').innerHTML;

  function mustache (a, b) {
    return (a + '').replace(/\{([^{}]+)\}/g, function(c, d) {
      return d in (b || {}) ? (/^f/.test(typeof b[d]) ? b[d]() : b[d]) : c;
    });
  }

  function parse (tweet) {
    var li = document.createElement('li');
    li.setAttribute('id', 'tweet_'+tweet.id);
    li.classList.add('tweet');
    li.innerHTML = mustache(template, tweet);
    return li;
  }

  socket.on('connect', function () {
    socket.emit('search');
    socket.on('tweet', function (result) {
      result = JSON.parse(result);
      messages.push(result);
    });
  }); 

  setInterval(function() {
    if (messages.length > 0) {
      var tweet = messages.pop();
      delete keys[tweet.id];

      tweet = parse(tweet);
      container.insertBefore(tweet, container.firstElementChild);

    }
  }, 3000);

  window.messages = messages;

  window.onbeforeunload = function() {
    socket.disconnect();
  };
})(window);
