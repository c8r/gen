#!/usr/bin/env node

const path = require('path')
const meow = require('meow')
const open = require('opn')

const {
  getData,
  render,
  writePages,
  server,
} = require('../lib')

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
const opts = Object.assign({}, cli.flags, {
  outDir: path.join(process.cwd(), cli.flags.outDir || '')
})

const create = async dirname => {
  const data = await getData(dirname, opts)
  const pages = await render(data, opts)
  const result = await writePages(pages, opts)
  return result
}

if (opts.dev) {
  server(dirname, opts)
    .then(srv => {
      const { port } = srv.address() || {}
      console.log(`listening on port: ${port}`)
      const url = `http://localhost:${port}`
      if (opts.open) {
        open(url)
      }
    })
    .catch(err => {
      console.log(err)
      process.exit(1)
    })
} else {
  create(dirname)
    .then(result => {
      console.log('exported files')
    })
    .catch(err => {
      console.log(err)
      process.exit(1)
    })
}
