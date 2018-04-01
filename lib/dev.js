const path = require('path')
const webpack = require('webpack')
const DevServer = require('webpack-dev-server')

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

const config = {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    path.join(__dirname, './entry')
  ],
  output: {
    path: __dirname,
    filename: 'dev.js',
    publicPath: '/'
  },
  resolve: {
    modules: [
      path.join(__dirname, '../node_modules'),
      'node_modules'
    ]
  },
  module: {
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
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

const devConfig = {
  hot: true,
  historyApiFallback: {
    index: '/dev'
  },
  overlay: true
}

const start = async (dirname, options) => {
  if (!dirname) return

  const {
    port = 8000
  } = options

  const configPath = options.config
    ? path.join(process.cwd(), options.config)
    : null

  config.resolve.modules.unshift(
    dirname,
    path.join(process.cwd(), 'node_modules'),
    path.join(dirname, 'node_modules')
  )

  config.entry.push(
    `webpack-dev-server/client?http://localhost:${port}`,
    'webpack/hot/only-dev-server'
  )

  config.plugins.push(
    new webpack.DefinePlugin({
      DIRNAME: JSON.stringify(dirname),
      CONFIG: JSON.stringify(configPath),
      ID: JSON.stringify(
        require.resolve(
          path.join(__dirname, './entry.js')
        )
      )
    })
  )

  // add config
  config.module.rules[1].use.options = {
    configPath
  }

  const compiler = webpack(config)
  const server = new DevServer(compiler, devConfig)

  return new Promise((resolve, reject) => {
    compiler.plugin('done', () => {
      resolve(server)
    })
    server.listen(port, err => {
      if (err) throw err
    })
  })
}

module.exports = start
