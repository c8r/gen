const React = require('react')
const PropTypes = require('prop-types')
const remark = require('remark')
const remarkSlug = require('remark-slug')
const remarkReact = require('remark-react')

const markdownComponents = require('./markdownComponents')

const heading = Comp => props => {
  return (
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
  )
}

const relativize = href => /\.md$/.test(href) ? href.replace(/\.md$/, '/') : href

const link = Comp => props => (
  React.createElement(Comp, Object.assign({}, props, {
    href: relativize(props.href)
  }))
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

class Markdown extends React.Component {
  constructor () {
    super()

    this.mapScope = scope => {
      const comps = {
        h1: heading(scope.Title || scope.Heading || scope.H1),
        h2: heading(scope.Heading || scope.H2),
        h3: heading(scope.Subhead || scope.H3),
        p: scope.Text,
        a: link(scope.Link),
        hr: scope.Divider,
        blockquote: scope.Blockquote,
        pre: scope.Pre,
        code: scope.Code,
        table: scope.Table,
      }

      return comps
    }

    this.applyProps = scope => {
      const { options = {} } = this.props
      const props = Object.assign({}, defaultProps, options.markdownProps)
      Object.keys(props).forEach(key => {
        if (!scope[key]) return
        scope[key].defaultProps = props[key]
      })
      return scope
    }
  }

  render() {
    const { text = '', scope, library } = this.props
    const defaultScope = markdownComponents({ library })

    const mappedScope = this.mapScope(Object.assign({}, defaultScope, scope))
    const remarkReactComponents = this.applyProps(mappedScope)

    const opts = {
      // pass Lab components to remark-react for rendering
      remarkReactComponents
    }
    const element = remark()
      .use(remarkSlug)
      .use(remarkReact, opts)
      .processSync(text).contents

    return element
  }
}

Markdown.propTypes = {
  scope: PropTypes.object
}

module.exports = Markdown
