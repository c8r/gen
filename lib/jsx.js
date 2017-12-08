const React = require('react')
const babel = require('babel-standalone')
const transformJSX = require('babel-plugin-transform-react-jsx')

const parse = raw => babel.transform(raw, {
  plugins: [
    transformJSX
  ]
}).code

const toComponent = (jsx, scope = {}) => {
  const el = parse(jsx)
  const scopeKeys = Object.keys(scope)
  const scopeValues = scopeKeys.map(key => scope[key])
  const create = new Function('React', ...scopeKeys, `return props => ${el}`)
  const Comp = create(React, ...scopeValues)
  // todo: validate
  return Comp
}

module.exports.parse = parse
module.exports.toComponent = toComponent
