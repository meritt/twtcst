fs     = require 'fs'
path   = require 'path'
coffee = require 'coffee-script'

compile = (file) ->
  input = path.normalize "./src/#{file}"

  fs.readFile input, 'utf-8', (error, code) ->
    return console.log error if error

    code   = coffee.compile code, bare: true
    output = path.normalize "./lib/#{file.replace /\.coffee$/, ".js"}"

    fs.writeFile output, code, (error) ->
      return console.log error if error
      console.log "#{output} has been compiled"

task 'build', 'Build lib from src', ->
  fs.readdir './src', (error, files) ->
    return console.log error if error

    fs.mkdirSync './lib' if not fs.existsSync './lib'

    for file in files when /\.coffee$/.test file
      compile file