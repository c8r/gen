const fs = require('fs')
const path = require('path')
const util = require('util')

const write = util.promisify(fs.writeFile)

const writePages = async (pages, opts) => {
  const {
    outDir = process.cwd()
  } = opts
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir)
  }

  const promises = pages.map(async page => {
    const dir = page.name === 'index' ? '' : page.name
    const filename = path.join(outDir, dir, 'index.html')
    if (!fs.existsSync(path.dirname(filename))) {
      fs.mkdirSync(path.dirname(filename))
    }
    return await write(filename, page.html)
  })
  const errs = await Promise.all(promises)

  return pages
}

module.exports = writePages
