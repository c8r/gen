import path from 'path'
import React from 'react'
import {
  BrowserRouter,
  StaticRouter,
  Route,
  Link,
  withRouter
} from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import { themeGet } from 'styled-system'
import Head from './Head'

const Router = typeof document === 'undefined'
  ? StaticRouter
  : BrowserRouter

let files = require.context(DIRNAME, true, /\.(jsx|mdx)$/)

const config = CONFIG
  ? require(CONFIG).default || require(CONFIG)
  : {
    theme: {},
    components: {}
  }

Object.keys(config.components).forEach(key => {
  global[key] = config.components[key]
})

const pages = []

files.keys().forEach(key => {
  const name = path.basename(key, path.extname(key))
  const pathname = name === 'index' ? '/' : '/' + name
  pages.push({
    key: key,
    name,
    pathname,
    component: files(key).default || files(key)
  })
})

const fontFamily = props => ({
  fontFamily: themeGet('fonts.sans')(props)
})

const Root = styled.div([],
  fontFamily,
)

const withLayout = (Component, components) => {
  if (!Component.defaultProps || !Component.defaultProps.layout) return Component
  const name = Component.defaultProps.layout
  const layout = components.find(c => c.name === name) || {}

  const Layout = layout.component
  if (!Layout) return Component

  return props => (
    <Layout>
      <Component {...props} />
    </Layout>
  )
}

class App extends React.Component {
  state = {
    pages,
    ...config
  }

  render () {
    const { pathname } = this.props
    const { theme, pages } = this.state

    return (
      <Router context={{}} location={pathname}>
        <Main {...this.props} {...this.state} />
      </Router>
    )
  }
}

const Main = withRouter(class extends React.Component {
  render () {
    const {
      location,
      theme,
      pages,
    } = this.props

    const home = pages.find(page => page.pathname === '/')
    const routes = pages.filter(page => page.pathname !== '/')

    const route = pages.find(page => page.pathname === location.pathname)
    const routeProps = route ? route.component.defaultProps : {}

    return (
      <React.Fragment>
        <Head {...routeProps} />
        <ThemeProvider theme={theme}>
          <Root>
            {home && (
              <Route
                exact
                path='/'
                component={withLayout(home.component, pages)}
              />
            )}
            {routes.map(route => (
              <Route
                key={route.name}
                path={'/' + route.name}
                component={withLayout(route.component, pages)}
              />
            ))}
          </Root>
        </ThemeProvider>
      </React.Fragment>
    )
  }
})

export default App

if (module.hot) {
  module.hot.accept(files.id, function() {
    files = require.context(DIRNAME, true, /\.(jsx|mdx)$/)
    const next = files.keys().map(key => {
      const name = path.basename(key, path.extname(key))
      const pathname = name === 'index' ? '/' : '/' + name
      return {
        key: key,
        name,
        pathname,
        component: files(key).default || files(key)
      }
    })
    app.setState({ pages: next })
  })
}
