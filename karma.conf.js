const webpackConfig = require('./webpack.config.test.js');

// Karma configuration
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],

    files: [
      {pattern: 'spec/spec_helper.js', watched: false},
      {pattern: 'spec/*_spec.js', watched: false},
      {pattern: 'spec/**/*_spec.js', watched: false}
      // each file acts as entry point for the webpack configuration
    ],

    preprocessors: {
      // add webpack as preprocessor
      'spec/*_helper.js': ['webpack', 'sourcemap'],
      'spec/*_spec.js': ['webpack', 'sourcemap'],
      'spec/**/*_spec.js': ['webpack', 'sourcemap']
    },

    webpack: {
      // karma watches the spec entry points
      // (you don't need to specify the entry option)
      // webpack watches dependencies

      // webpack configuration
      resolve: webpackConfig.resolve,
      module: webpackConfig.module,
      externals: { window: 'window' },
      devtool: 'inline-source-map'
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      noInfo: true,
      stats: { colors: true }
    },

    autoWatch: true,
    singleRun: false,
    browsers: [
      // 'PhantomJS', // wait for phantomjs2.5, which contain subclassing array
      'Chrome'
    ],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-jasmine'
    ],

    logLevel: [
      config.LOG_INFO
    ],

    port: 9877,
    browserNoActivityTimeout: 100 * 1000
  });
};
