const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const React = require('react')
const { renderToString } = require('react-dom/server')
const { ServerStyleSheet } = require('styled-components')

const babelOptions = {
  presets: [
    'babel-preset-env',
    'babel-preset-stage-0',
    'babel-preset-react'
  ].map(require.resolve),
  plugins: [
    require.resolve('babel-plugin-transform-runtime')
  ]
}

const webpackModule = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: require.resolve('babel-loader'),
        options: babelOptions
      }
    },
    {
      test: /\.jsx$/,
      use: {
        loader: require.resolve('./jsx-loader')
      }
    },
    {
      test: /\.mdx$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: babelOptions
        },
        require.resolve('./mdx-loader')
      ]
    }
  ]
}

const template = ({
  html,
  css = ''
}) => (`<!DOCTYPE html>
<head>
<meta charset='utf-8'>
<meta name='viewport' content='width=device-width,initial-scale=1'>
${css}
</head>
<div id='root'>${html}</div>
<script src='/bundle.js'></script>
`)

const createHTML = async (dirname, options) => {
  const outpath = options.outDir || process.cwd()
  const config = {
    mode: 'development',
    entry: path.join(__dirname, './App.js'),
    output: {
      path: outpath,
      filename: 'App.js',
      libraryExport: 'default',
      libraryTarget: 'umd'
    },
    target: 'node',
    externals: [
      require('webpack-node-externals')()
    ],
    resolve: {
      modules: [
        dirname,
        path.join(process.cwd(), 'node_modules'),
        path.join(dirname, 'node_modules')
      ]
    },
    module: webpackModule,
    plugins: [
      new webpack.DefinePlugin({
        DIRNAME: JSON.stringify(dirname),
        CONFIG: options.config ? JSON.stringify(path.join(process.cwd(), options.config)) : false,
      })
    ]
  }
  const compiler = webpack(config)
  const routes = fs.readdirSync(dirname)
    .filter(file => /\.(jsx|mdx)$/.test(file))
    .map(file => '/' + path.basename(file, path.extname(file)))
    .map(route => route === '/index' ? '/' : route)

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err)

      try {
        const App = require(path.join(outpath, './App.js'))
        const pages = routes
          .map(pathname => {
            const filename = path.join(outpath, '.' + pathname + '/index.html')
            const sheet = new ServerStyleSheet()
            const html = renderToString(
              sheet.collectStyles(
                React.createElement(App, { pathname })
              )
            )
            const css = sheet.getStyleTags()
            return {
              filename,
              html,
              css
            }
          })
          .map(page => Object.assign({}, page, {
            content: template(page)
          }))
        pages.forEach(page => {
          const dirname = path.dirname(page.filename)
          if (!fs.existsSync(dirname)) fs.mkdirSync(dirname)
          fs.writeFileSync(page.filename, page.content)
        })
      } catch (e) {
        reject(e)
      }
    })
  })
}

const build = async (dirname, options) => {
  if (!dirname) return
  const config = {
    mode: 'production',
    entry: [
      path.join(__dirname, './entry')
    ],
    output: {
      path: process.cwd(),
      filename: 'bundle.js',
      publicPath: '/'
    },
    resolve: {
      modules: [
        path.join(__dirname, '../node_modules'),
        'node_modules'
      ]
    },
    module: webpackModule,
    node: {
      fs: 'empty'
    },
    plugins: []
  }

  const outpath = options.outDir || process.cwd()
  const outfile = path.join(outpath, 'bundle.js')
  if (options.outDir) {
    config.output.path = outpath
  }

  if (options.basename) {
    config.output.publicPath = options.basename + '/'
  }

  config.resolve.modules.unshift(
    dirname,
    path.join(process.cwd(), 'node_modules'),
    path.join(dirname, 'node_modules')
  )

  config.plugins.push(
    new webpack.DefinePlugin({
      DIRNAME: JSON.stringify(dirname),
      CONFIG: options.config ? JSON.stringify(path.join(process.cwd(), options.config)) : false,
      ID: JSON.stringify(
        require.resolve(
          path.join(__dirname, './entry.js')
        )
      )
    })
  )

  // get files
  // create HTML

  const compiler = webpack(config)

  return new Promise((resolve, reject) => {
    compiler.run(async (err, stats) => {
      if (err) reject(err)
      const html = await createHTML(dirname, options)
      // const App = require(outfile).defa
      resolve(stats)
    })
  })
}

module.exports = build
