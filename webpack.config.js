const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('./config')

module.exports = {
  name    : 'client',
  target  : 'web',
  devtool: 'source-map',
  entry: {
    'app': [ __dirname + '/web/static/css/app.scss', __dirname + '/web/static/js/app.js' ]
  },
  output: {
    path: './priv/static',
    filename: 'js/app.js'
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
    extensions : ['', '.js', '.jsx', '.json']
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        cacheDirectory : true,
        plugins        : ['transform-runtime'],
        presets        : ['es2015', 'react', 'stage-0']
      }
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css')
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
        'style',
        'css!sass?includePaths[]=' + __dirname + '/web/static/css'
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
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
