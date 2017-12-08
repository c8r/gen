const React = require('react')
const {
  renderToStaticMarkup,
  renderToString
} = require('react-dom/server')
const styled = require('styled-components').default
const glamorous = require('glamorous')

const createComponents = require('./createComponents')
const { toComponent } = require('./jsx')
const primitives = require('./primitives')

const h = React.createElement
const SCProvider = require('styled-components').ThemeProvider
const GlamorousProvider = glamorous.ThemeProvider

const themeProviders = {
  'styled-components': SCProvider,
  glamorous: GlamorousProvider,
}

// todo: appScope

const renderPage = (scope, opts) => page => {
  const Provider = themeProviders[opts.library] || themeProviders['styled-components']
  const pageScope = Object.assign({}, scope, { Provider })
  const Page = toComponent(`<Provider theme={theme}>
    <React.Fragment>
      ${page.content || 'hello markdown'}
    </React.Fragment>
  </Provider>`, pageScope)

  try {
    console.log(page.name)
    // console.log(Page)
    const el = h(Page, page.data)
    // console.log(el)
    const html = renderToStaticMarkup(el)
    // const html = renderToString(el)
    console.log(html)
    return Object.assign({}, page, {
      html
    })
  } catch (err) {
    console.log(err)
    return page
  }
}

const render = async ({
  dirname,
  theme = {},
  lab = {},
  pages = []
}) => {
  const library = lab.library || 'styled-components'
  const opts = {
    dirname,
    library,
  }

  const base = createComponents(primitives, opts)
  console.log(base)
  const components = createComponents(lab.components, opts)
  const scope = Object.assign({}, base, components, {
    theme
  })

  const rendered = pages.map(renderPage(scope, opts))

  // console.log('todo: render', rendered)

  return 'hello'
}

module.exports = render
