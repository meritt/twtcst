fs     = require 'fs'
path   = require 'path'
coffee = require 'coffee-script'
glob   = require 'glob'

src = path.normalize "#{__dirname}/src"
dst = path.normalize "#{__dirname}/lib"

compile = (soure, output) ->
  fs.readFile soure, 'utf-8', (error, code) ->
    if error
      console.log error
      return

    code   = coffee.compile code, bare: true
    output = output.replace '.coffee', '.js'

    fs.writeFile output, code, (error) ->
      if error
        console.log error
        return

      output = output.replace(dst, '').replace('/', '')
      console.log "#{output} has been compiled"

task 'build', 'Build lib from src', ->
  fs.mkdirSync "#{dst}/validate" unless fs.existsSync "#{dst}/validate"
  fs.mkdirSync "#{dst}/beautify" unless fs.existsSync "#{dst}/beautify"

  glob '**/*.coffee', cwd: src, (error, files) ->
    if error
      console.log error
      return

    for file in files
      compile "#{src}/#{file}", "#{dst}/#{file}"