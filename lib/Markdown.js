const React = require('react')
const PropTypes = require('prop-types')
const { Markdown } = require('@compositor/markdown')

const markdownComponents = require('./markdownComponents')

const heading = Comp => props =>
  React.createElement(Comp, props,
    React.createElement('a', {
      href: '#' + props.id,
      style: {
        color: 'inherit',
        textDecoration: 'none'
      }
    },
      props.children
    )
  )

const defaultProps = {
  h1: {
    mt: 4,
    mb: 3
  },
  h2: {
    mt: 4,
    mb: 3
  },
  h3: {
    mt: 4,
    mb: 3
  },
  p: {
    mt: 0,
    mb: 3
  }
}

const mapScope = scope => ({
  h1: heading(scope.Title || scope.Heading || scope.H1),
  h2: heading(scope.Heading || scope.H2),
  h3: heading(scope.Subhead || scope.H3),
  p: scope.Text,
  a: scope.Link,
  hr: scope.Divider,
  blockquote: scope.Blockquote,
  pre: scope.Pre,
  code: scope.Code,
  table: scope.Table
})

const applyProps = (scope, options = {}) => {
  const props = Object.assign({}, defaultProps, options.markdownProps || {})
  Object.keys(props).forEach(key => {
    if (!scope[key]) return
    scope[key].defaultProps = Object.assign({},
      scope[key].defaultProps,
      props[key]
    )
  })
  return scope
}

const GenMarkdown = props => {
  const { text = '', scope, library } = props
  const defaultScope = markdownComponents({ library })
  const mappedScope = mapScope(Object.assign({}, defaultScope, scope))

  return React.createElement(Markdown, {
    components: applyProps(mappedScope),
    scope: Object.assign({}, scope, { props }),
    toc: true,
    text
  })
}

GenMarkdown.propTypes = {
  scope: PropTypes.object
}

module.exports = GenMarkdown
