var config = require('./webpack.config.js');
// just for karma
Object.assign(config, {
  debug: true,
  devtool: 'source-map'
}),

config.output = Object.assign(config.output, {
  devtoolModuleFilenameTemplate: '[resourcePath]',
  devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
})
config.module.rules.push({
  test: /\.css$/,
  loader: 'file-loader'
}, {
  test: /\.js$/,
  exclude: [/node_modules/],
  use: [{
    loader: 'babel-loader',
    options: {
      presets: ['es2015'],
      plugins: [
        [
          "babel-plugin-transform-builtin-extend", {
            globals: ["Error", "Array"]
          }
        ]
      ]
    }
  }]
})

module.exports = config
