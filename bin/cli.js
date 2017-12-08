#!/usr/bin/env node

const meow = require('meow')

const {
  getData,
  render,
} = require('../lib')

const cli = meow(`
  Usage:
    $ z0 dirname

  Options:
    --out-dir, -d    Output directory
    --dev
`, {
  flags: {
    outDir: {
      type: 'string',
      alias: 'd'
    }
  }
})

const [ dirname ] = cli.input
const opts = Object.assign({}, cli.flags)

const create = async dirname => {
  const data = await getData(dirname, opts)
  const pages = await render(data, opts)
  // const result = await writePages(pages)
  return pages
}

create(dirname)
  .then(result => {
    console.log('exported', result)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
