var Counter, fs, path;

fs = require('fs');

path = require('path');

Counter = (function() {
  var counter, file, fromFile, read, save;

  file = '';

  counter = 0;

  fromFile = false;

  function Counter(fileName) {
    if (fileName) {
      file = path.normalize(fileName);
      fs.exists(file, function(exists) {
        if (exists) {
          return read();
        } else {
          return save();
        }
      });
    }
  }

  Counter.prototype.inc = function() {
    ++counter;
    save();
    return counter;
  };

  Counter.prototype.set = function(n) {
    counter += n;
    save();
    return counter;
  };

  read = function() {
    return fs.readFile(file, function(err, data) {
      if (err) {
        return console.log(err);
      } else {
        counter += parseInt(data, 10) || 0;
        return fromFile = true;
      }
    });
  };

  save = function() {
    if (fromFile) {
      return fs.writeFile(file, counter, function(err) {
        if (err) {
          console.log(err);
          return fromFile = false;
        } else {
          return fromFile = true;
        }
      });
    }
  };

  return Counter;

})();

module.exports = function(file) {
  return new Counter(file);
};
