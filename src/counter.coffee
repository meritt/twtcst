
fs = require 'fs'
path = require 'path'

class Counter

  file = ''
  counter = 0
  fromFile = false

  constructor: (fileName) ->
    file = path.normalize fileName
    fs.exists file, (exists) ->
      if exists
        read()
      else
        save()

  inc: ->
    ++counter
    save() if fromFile
    counter

  read = ->
    fs.readFile file, (err, data) ->
      if err
        console.log err
      else
        counter += parseInt(data, 10) || 0
        fromFile = true

  save = ->
    fs.writeFile file, counter, (err) ->
      if err
        console.log err
        fromFile = false
      else
        fromFile = true


module.exports = (options) ->
  return new Counter options.count

