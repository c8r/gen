const { getOptions } = require('loader-utils')
const mdx = require('@mdx-js/mdx')
const matter = require('gray-matter')
const stringify = require('stringify-object')

const create = (result, props) => `
import React from 'react'
import { MDXTag } from '@mdx-js/tag'

const props = ${stringify(props)}

${result}
`

module.exports = function (src) {
  const callback = this.async()
  const opts = getOptions(this) || {}

  const { data, content } = matter(src)
  const result = mdx(content, opts)
  const code = create(result, data)

  callback(null, code)
}

