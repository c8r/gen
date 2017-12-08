const React = require('react')
const PropTypes = require('prop-types')
const remark = require('remark')
const remarkSlug = require('remark-slug')
const remarkReact = require('remark-react')

const defaultScope = {}

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

class Markdown extends React.Component {
  constructor () {
    super()

    this.mapScope = scope => {
      return {
        h1: heading(scope.Title || scope.Heading || scope.H1),
        h2: heading(scope.Heading || scope.H2),
        h3: heading(scope.Subhead || scope.H3),
        p: scope.Text,
        a: scope.Link,
        pre: scope.Pre,
        code: scope.Code,
        table: scope.Table,
      }
    }
  }

  render() {
    const { children, scope } = this.props

    const mappedScope = this.mapScope(scope)
    const remarkReactComponents = Object.assign({}, defaultScope, mappedScope, scope)
    const text = React.Children.toArray(children)
      .filter(child => typeof child === 'string')
      .join('\n\n')
    const opts = {
      // pass Lab components to remark-react for rendering
      remarkReactComponents,
      toHast: {
        handlers: {
          // code: codeHandler
        }
      }
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
