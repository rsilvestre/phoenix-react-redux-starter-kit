const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('./config')

const __DEV__ = config.globals.__DEV__
const __PROD__ = config.globals.__PROD__
const __TEST__ = config.globals.__TEST__

webpackConfig = {
  name    : 'client',
  target  : 'web',
  devtool: 'source-map',
  entry: {
    'app': [
      __dirname + '/web/static/css/app.scss',
      __dirname + '/web/static/js/app.js'
    ],
    'vendor': config.compiler_vendors
  },
  output: {
    path: './priv/static',
    filename: 'js/[name].js',
    publicPath: '/',
    chunkFilename: "js/[id].[name].js"
  },
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true
  },
  resolve: {
    moduleDirectories: [__dirname + '/web/static/js', 'node_modules'],
    alias: {
      phoenix: __dirname + '/deps/phoenix/web/static/js/phoenix.js',
      containers: __dirname + '/web/static/js/containers',
      routes: __dirname + '/web/static/js/containers',
      styles: __dirname + '/web/static/css',
      static: __dirname + '/web/static/js/static',
      store: __dirname + '/web/static/js/store',
      components: __dirname + '/web/static/js/components',
      layouts: __dirname + '/web/static/js/layouts',
      views: __dirname + '/web/static/js/views',
      actions: __dirname + '/web/static/js/redux/modules'
    },
    root: __dirname + '/web/static/js',
    extensions : ['', '.js', '.jsx', '.json', '.sass']
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        cacheDirectory : true,
        plugins        : ['transform-runtime', "transform-decorators-legacy"],
        presets        : ['es2015', 'react', 'stage-2', 'stage-0']
      }
    }, {
      test   : /\.json$/,
      loader : 'json'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css')
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
        'style',
        'css!sass?includePaths[]=' + __dirname + '/web/static/css'
      )
    }, {
      test: /\.sass$/,
      loader: ExtractTextPlugin.extract(
        'style',
        'css!sass?indentedSyntax&includePaths[]=' + __dirname +  '/node_modules'
      )
    },
      { test: /\.woff(\?.*)?$/,  loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
      { test: /\.otf(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
      { test: /\.ttf(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
      { test: /\.svg(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
      { test: /\.jpg$/,          loader: 'url?limit=8192' },
      { test: /\.png$/,          loader: "url-loader?mimetype=image/png" }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(config.globals),
    new ExtractTextPlugin('css/app.css'),
    new CopyWebpackPlugin([
      { from: './web/static/assets'},
      { from: './deps/phoenix_html/web/static/js/phoenix_html.js',
        to: 'js/phoenix_html.js'
      }
    ])
  ]
}

// Ensure that the compiler exits on errors during testing so that
// they do not get skipped and misreported.
if (__TEST__ && !argv.watch) {
  webpackConfig.plugins.push(function () {
    this.plugin('done', function (stats) {
      const errors = []
      if (stats.compilation.errors.length) {
        // Log each of the warnings
        stats.compilation.errors.forEach(function (error) {
          errors.push(error.message || error)
        })

        // Pretend no assets were generated. This prevents the tests
        // from running making it clear that there were warnings.
        throw new Error(errors)
      }
    })
  })
}

if (__DEV__) {
  console.log('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
} else if (__PROD__) {
  console.log('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress : {
        unused    : true,
        dead_code : true,
        warnings  : false
      }
    })
  )
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      names : ['vendor']
    })
  )
}

module.exports = webpackConfig
