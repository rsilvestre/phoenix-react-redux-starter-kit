const argv = require('yargs').argv
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('./config')
const cssnano = require('cssnano')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const __DEV__ = config.globals.__DEV__
const __PROD__ = config.globals.__PROD__
const __TEST__ = config.globals.__TEST__

const BASE_CSS_LOADER = 'css?sourceMap&-minimize'

const webpackConfig = {
  name    : 'client',
  target  : 'web',
  devtool: 'source-map',
  entry: {
    'app': [
      __dirname + '/web/static/css/app.scss',
      config.utils_paths.client('app.js')
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
    root: config.utils_paths.client(),
    extensions : ['', '.js', '.jsx']
  },
  sassLoader: {
    includePaths : config.utils_paths.client('styles')
  },
  postcss: [
    cssnano({
      autoprefixer : {
        add      : true,
        remove   : true,
        browsers : ['last 2 versions']
      },
      discardComments : {
        removeAll : true
      },
      discardUnused : false,
      mergeIdents   : false,
      reduceIdents  : false,
      safe          : true,
      sourcemap     : true
    })
  ],
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: config.compiler_babel
    }, {
      test   : /\.json$/,
      loader : 'json'
    }, {
      test    : /\.css$/,
      exclude : null,
      loaders : [
        'style',
        BASE_CSS_LOADER,
        'postcss'
      ]
    }, {
      test    : /\.scss$/,
      exclude : null,
      loaders : [
        'style',
        BASE_CSS_LOADER,
        'postcss',
        'sass?sourceMap'
      ]
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
      { test: /\.(png|jpg)$/,    loader: 'url?limit=8192' }
    ]
  },
  plugins:[
    new webpack.DefinePlugin(config.globals),
  ]
}

if (__TEST__) {
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      template : config.utils_paths.client('index.html'),
      hash     : false,
      favicon  : config.utils_paths.public('favicon.ico'),
      filename : 'index.html',
      inject   : 'body',
      minify   : {
        collapseWhitespace : true
      }
    })
  )
} else {
  webpackConfig.plugins.push(
    new ExtractTextPlugin('css/app.css'),
    new CopyWebpackPlugin([
      { from: './web/static/assets' },
      {
        from: './deps/phoenix_html/web/static/js/phoenix_html.js',
        to: 'js/phoenix_html.js'
      }
    ]),
    new webpack.optimize.CommonsChunkPlugin({
      names : ['vendor'],
      minChunks: Infinity
    })
  )
}

// Ensure that the compiler exits on errors during testing so that
// they do not get skipped and misreported.
if (__TEST__ && !argv.watch) {
  webpackConfig.plugins.push(function () {
    this.plugin('done', function (stats) {
      if (stats.compilation.errors.length) {
        // Pretend no assets were generated. This prevents the tests
        // from running making it clear that there were warnings.
        throw new Error(
          stats.compilation.errors.map(err => err.message || err)
        )
      }
    })
  })
}

if (__DEV__) {
  console.log('Enabling plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
} else if (__PROD__) {
  console.log('Enabling plugins for production (OccurenceOrder, Dedupe & UglifyJS).')
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

module.exports = webpackConfig
