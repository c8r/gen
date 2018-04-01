const matter = require('gray-matter')
const { getOptions } = require('loader-utils')
const babel = require('babel-core')
const transformJSX = require('babel-plugin-transform-react-jsx')
const stringify = require('stringify-object')

const parse = raw => babel.transform(raw, {
  plugins: [
    transformJSX
  ]
}).code

const wrap = str => `<React.Fragment>${str}</React.Fragment>`

// todo: component context?
const create = (jsx, props, opts) => `
import React from 'react'
${opts.configPath ? (`import config from '${opts.configPath}'`) : ''}

const Component = props =>
  ${parse(wrap(jsx))}

Component.defaultProps = ${stringify(props)}

export default Component
`

// todo: look into this.addDependency, etc for component scope
module.exports = function (src) {
  const callback = this.async()
  const opts = getOptions(this)

  const { data, content } = matter(src)
  const code = create(content, data, opts)

  callback(null, code)
}
