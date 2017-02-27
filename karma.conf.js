// Karma configuration
module.exports = function(config) {
  config.set({
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
      devtool: 'inline-source-map'
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only'
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
