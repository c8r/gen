const React = require('react')
const {
  renderToStaticMarkup,
  renderToString
} = require('react-dom/server')
const SC = require('styled-components')
const glamorous = require('glamorous')
const glamor = require('glamor/server')
const dot = require('dot-prop')
const webfont = require('@compositor/webfont')

const createComponents = require('./createComponents')
const { toComponent } = require('./jsx')
const primitives = require('./primitives')
const createHTML = require('./createHTML')
const Markdown = require('./Markdown')

const h = React.createElement

const themeProviders = {
  'styled-components': SC.ThemeProvider,
  glamorous: glamorous.ThemeProvider,
}

const cssCreators = {
  'styled-components': (Component, props) => {
    const sheet = new SC.ServerStyleSheet()
    renderToStaticMarkup(
      sheet.collectStyles(
        h(Component, props)
      )
    )
    const tags = sheet.getStyleTags()
    return tags
  },
  glamorous: (Component, props) => {
    const { css } = glamor.renderStatic(() => (
      renderToString(
        React.createElement(Component, props)
      )
    ))
    const tag = `<style>${css}</style>`
    return tag
  }
}

// alias
cssCreators.glamor = cssCreators.glamorous

const getLayout = (pages = [], data, scope) => {
  if (!data.layout) return scope.DefaultLayout
  const layout = pages.find(page => page.name === data.layout)

  if (!layout || layout.ext !== '.jsx') return scope.DefaultLayout

  const { content } = layout
  try {
    const Comp = toComponent(content, scope)
    return Comp
  } catch (err) {
    return scope.DefaultLayout
  }
}

const renderPage = (scope, opts) => page => {
  const library = opts.library || 'styled-components'
  const Provider = themeProviders[library]
  const getCSS = cssCreators[library]

  const Layout = page.ext === '.md'
    ? getLayout(opts.pages, page.data, scope)
    : React.Fragment
  const pageScope = Object.assign({}, scope, {
    Layout,
    Markdown,
    Provider,
    scope,
    page,
  })

  const content = page.ext === '.jsx'
    ? page.content
    : `<Markdown text={page.content} scope={scope} library='${library}' />`

  const Page = toComponent(`<Provider theme={theme}>
      <Font>
        <Layout>
          ${content}
        </Layout>
      </Font>
    </Provider>`, pageScope)

  try {
    const el = h(Page, page.data)
    const body = renderToStaticMarkup(el)
    // const html = renderToString(el)
    // todo: css
    const css = getCSS(Page, page.data) // full style tag
    const fontLinks = dot.get(scope, 'theme.fonts', [])
      .map(font => webfont.getLinkTag(font))
      .filter(tag => !!tag)
      .join('')
    const html = createHTML({ body, css, fontLinks, data: page.data })
    return Object.assign({}, page, {
      html
    })
  } catch (err) {
    console.log(err)
    return Object.assign({}, page, {
      html: err.toString()
    })
  }
}

const render = async ({
  dirname,
  theme = {},
  lab = {},
  pages = []
}, _opts) => {
  const library = lab.library || 'styled-components'
  const opts = Object.assign({
    dirname,
    library,
    pages,
  }, _opts)

  const base = createComponents(primitives, opts)
  const components = createComponents(lab.components, opts)
  const scope = Object.assign({}, base, components, {
    theme
  })
  const rendered = pages.map(renderPage(scope, opts))

  return rendered
}

module.exports = render
