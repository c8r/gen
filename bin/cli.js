#!/usr/bin/env node
const path = require('path')
const meow = require('meow')
const { pkg } = require('read-pkg-up').sync()
const open = require('react-dev-utils/openBrowser')
const chalk = require('chalk')

require('update-notifier')({
  pkg: require('../package.json')
}).notify()

const cli = meow(`
  Usage:

    $ gen dirname

  Options:

    -c --config   Path to config file

    -p --port     Port for dev server

    -o --open     Open server in default browser

    --static      Build to static HTML without client-side bundle.js

    -d --out-dir  Output directory for static build

`, {
  flags: {
    config: {
      type: 'string',
      alias: 'c'
    },
    port: {
      type: 'string',
      alias: 'p'
    },
    open: {
      type: 'boolean',
      alias: 'o'
    },
    outDir: {
      type: 'string',
      alias: 'd'
    }
  }
})

const [ dir ] = cli.input
const options = Object.assign({},
  pkg.gen,
  cli.flags
)

if (options.outDir) {
  options.outDir = path.isAbsolute(options.outDir)
    ? options.outDir
    : path.join(process.cwd(), options.outDir)
}

const dirname = path.isAbsolute(dir)
  ? dir
  : path.join(process.cwd(), dir)

const log = (...msgs) => {
  console.log(
    chalk.black.bgCyan(' gen '),
    chalk.cyan(...msgs)
  )
}

log('@compositor/gen')

const { dev, build } = require('../lib')

if (options.outDir) {
  log('building static site')
  build(dirname, options)
    .then(res => {
      console.log(res)
      log('static site saved to ' + dirname)
    })
    .catch(err => {
      console.log(err)
      process.exit(1)
    })
} else {
  dev(dirname, options)
    .then(server => {
      const { port } = server.listeningApp.address()
      if (options.open) {
        open(`http://localhost:${port}`)
      }
    })
    .catch(err => {
      console.log(err)
      process.exit(1)
    })
}
