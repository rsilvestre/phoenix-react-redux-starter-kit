const argv = require('yargs').argv
const config = require('./config')
const webpackConfig = require('./webpack.config')
const debug = require('debug')('app:config:karma')

debug('Creating configuration.')
const karmaConfig = {
  basePath: config.utils_paths.base(), // project root in relation to bin/karma.js
  files: [
    {
      pattern: config.utils_paths.test('test-bundler.js'),
      watched: false,
      served: true,
      included: true
    }
  ],
  singleRun: !argv.watch,
  frameworks: ['mocha', 'intl-shim'],
  reporters: ['mocha'],
  preprocessors: {
    [config.utils_paths.test('test-bundler.js')]: ['webpack']
  },
  browsers: ['PhantomJS'],
  webpack: {
    devtool: 'cheap-module-source-map',
    resolve: Object.assign({}, webpackConfig.resolve, {
      alias: Object.assign({}, webpackConfig.resolve.alias, {
        sinon: 'sinon/pkg/sinon.js'
      }),
      modulesDirectories: [
        '.',
        'node_modules'
      ]
    }),
    plugins: webpackConfig.plugins,
    // plugins: webpackConfig.plugins,
    module: {
      noParse: [
        /\/sinon\.js/
      ],
      loaders: webpackConfig.module.loaders.concat([
        {
          test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
          loader: 'imports?define=>false,require=>false'
        }
      ])
    },
    // Enzyme fix, see:
    // https://github.com/airbnb/enzyme/issues/47
    externals: Object.assign({}, webpackConfig.externals, {
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window'
    }),
    sassLoader: webpackConfig.sassLoader
  },
  webpackMiddleware: {
    noInfo: true
  },
  coverageReporter: {
    reporters: config.coverage_reporters
  }
}

if (config.globals.__COVERAGE__) {
  karmaConfig.reporters.push('coverage')
  karmaConfig.webpack.module.preLoaders = [{
    test: /\.(js|jsx)$/,
    include: new RegExp(config.dir_client),
    exclude: /node_modules/,
    loader: 'babel',
    query   : Object.assign({}, config.compiler_babel, {
      plugins : (config.compiler_babel.plugins || []).concat('istanbul')
    })
  }]
}

// cannot use `export default` because of Karma.
module.exports = (cfg) => cfg.set(karmaConfig)
