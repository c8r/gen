#!/usr/bin/env node

const path = require('path')
const meow = require('meow')

const {
  getData,
  render,
  writePages,
} = require('../lib')

const cli = meow(`
  Usage:
    $ z0 dirname

  Options:
    --out-dir, -d    Output directory
`, {
  flags: {
    outDir: {
      type: 'string',
      alias: 'd'
    }
  }
})

const [ dirname ] = cli.input
const opts = Object.assign({}, cli.flags, {
  outDir: path.join(process.cwd(), cli.flags.outDir || '')
})

const create = async dirname => {
  const data = await getData(dirname, opts)
  const pages = await render(data, opts)
  const result = await writePages(pages, opts)
  return result
}

create(dirname)
  .then(result => {
    console.log('exported')
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
