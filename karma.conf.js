const webpackConfig = require('./webpack.config.test.js');

// Karma configuration
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],

    // ... normal karma configuration
    files: [
      // all files ending in "_spec"
      {pattern: 'spec/*_spec.js', watched: false},
      {pattern: 'spec/**/*_spec.js', watched: false}
      // each file acts as entry point for the webpack configuration
    ],

    preprocessors: {
      // add webpack as preprocessor
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
    browsers: ['PhantomJS'],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-jasmine'
    ]
  });
};
