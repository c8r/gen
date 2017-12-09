#!/usr/bin/env node

const path = require('path')
const meow = require('meow')
const open = require('opn')
const chalk = require('chalk')
const readPkgUp = require('read-pkg-up')

const pkg = require('../package.json')
require('update-notifier')({ pkg }).notify()

const {
  getData,
  render,
  writePages,
  server,
} = require('../lib')

const log = (...msgs) => {
  console.log(
    chalk.black.bgCyan(' gen '),
    chalk.cyan(...msgs)
  )
}

const cli = meow(`
  Usage:
    $ gen dirname

  Options:
    --out-dir, -d   Output directory
    --dev, -D       Start development server
    --port, -p      Set port for development server
    --open, -o      Open development server in default browser
`, {
  flags: {
    outDir: {
      type: 'string',
      alias: 'd'
    },
    dev: {
      type: 'boolean',
      alias: 'D'
    },
    port: {
      type: 'string',
      alias: 'p'
    },
    open: {
      type: 'boolean',
      alias: 'o'
    }
  }
})

const [
  dirname = process.cwd()
] = cli.input
const userPkg = readPkgUp.sync(dirname) || {}
const opts = Object.assign({}, userPkg.gen, cli.flags, {
  outDir: path.join(process.cwd(), cli.flags.outDir || '')
})

const create = async dirname => {
  const data = await getData(dirname, opts)
  const pages = await render(data, opts)
  const result = await writePages(pages, opts)
  return result
}

log('@compositor/gen')

if (opts.dev) {
  log('starting dev server')
  server(dirname, opts)
    .then(srv => {
      const { port } = srv.address() || {}
      log(`listening on port: ${port}`)
      const url = `http://localhost:${port}`
      if (opts.open) {
        open(url)
      }
    })
    .catch(err => {
      log('error', err)
      process.exit(1)
    })
} else {
  create(dirname)
    .then(result => {
      log('files saved to', dirname)
    })
    .catch(err => {
      log('error', err)
      process.exit(1)
    })
}
