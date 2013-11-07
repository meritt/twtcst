fs = require 'fs'
path = require 'path'
coffee = require 'coffee-script'

task 'build', 'Build lib/ from src/', ->
  fs.readdir './src', (err, files) ->
    if err
      console.log 'Unable to read ./src'
      console.log err
    else
      if not fs.existsSync './lib'
        fs.mkdirSync './lib'
      for file in files when /\.coffee$/.test file
        do (file) ->
          input = path.normalize "./src/#{file}"

          fs.readFile input, 'utf-8', (err, code) ->
            if err
              console.log err
              return
            code = coffee.compile code, { bare: true }
            output = "./lib/#{file.replace /\.coffee$/, ".js"}"

            fs.writeFile output, code, (err) ->
              if err
                console.log err
                return
              console.log "#{output} has been compiled"
