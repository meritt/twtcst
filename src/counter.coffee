
fs = require 'fs'
path = require 'path'

class Counter

  file = ''
  counter = 0
  fromFile = false

  constructor: (fileName) ->
    if fileName
      file = path.normalize fileName
      fs.exists file, (exists) ->
        if exists
          read()
        else
          fromFile = true
          save()

  inc: ->
    ++counter
    save()
    counter

  set: (n) ->
    counter += n
    save()
    counter

  read = ->
    fs.readFile file, (err, data) ->
      if err
        console.log err
      else
        counter += parseInt(data, 10) || 0
        fromFile = true

  save = ->
    if fromFile
      fs.writeFile file, counter, (err) ->
        if err
          console.log err
          fromFile = false
        else
          fromFile = true


module.exports = (file) ->
  return new Counter file
